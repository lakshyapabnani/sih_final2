import { useEffect, useState } from "react";
import AccessMessage from "./components/Auth/AccessMessage.jsx";
import AuthPage from "./components/Auth/AuthPage.jsx";
import LandingPage from "./components/Auth/LandingPage.jsx";
import RoleSelectionPage from "./components/Auth/RoleSelectionPage.jsx";
import TopNav from "./components/Shared/TopNav.jsx";
import SeasonalBar from "./components/Shared/SeasonalBar.jsx";
import HospitalPortal from "./components/Hospital/HospitalPortal.jsx";
import VendorPortal from "./components/Vendor/VendorPortal.jsx";
import { authConfigMessage, hasSupabaseConfig, supabase } from "./lib/supabase.js";

const portalRoutes = {
  "/hospital": "hospital",
  "/vendor": "vendor",
};

const loginRoutes = {
  "/hospital/login": "hospital",
  "/vendor/login": "vendor",
};

function currentPath() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function portalPath(portal) {
  return portal === "hospital" ? "/hospital" : "/vendor";
}

function loginPath(portal) {
  return portal === "hospital" ? "/hospital/login" : "/vendor/login";
}

function normalizeRole(role) {
  const normalized = role?.toLowerCase();
  return normalized === "hospital" || normalized === "vendor" ? normalized : null;
}

function friendlyAuthError(error) {
  if (!error) return "";
  const message = error.message || "";

  if (message.toLowerCase().includes("invalid login credentials")) {
    return "Invalid email or password.";
  }

  if (message.toLowerCase().includes("failed to fetch")) {
    return "Unable to reach Supabase. Check your connection and configuration.";
  }

  return "Unable to sign in right now. Please check your credentials and try again.";
}

function profilePayload(user, selectedRole) {
  return {
    id: user.id,
    user_id: user.id,
    email: user.email || "",
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
    role: selectedRole,
  };
}

export default function App() {
  const [season, setSeason] = useState("normal");
  const [route, setRoute] = useState(currentPath);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [profileMissing, setProfileMissing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSavingRole, setIsSavingRole] = useState(false);
  const [authError, setAuthError] = useState("");

  function navigate(path) {
    window.history.pushState({}, "", path);
    setRoute(currentPath());
  }

  async function resolveRole(user) {
    const metadataRole = normalizeRole(user?.user_metadata?.role);

    if (!supabase || !user) {
      setProfileMissing(!metadataRole);
      return metadataRole;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .or(`user_id.eq.${user.id},id.eq.${user.id}`)
      .maybeSingle();

    if (error) {
      console.error("Unable to load profile role", error);
      setProfileMissing(!metadataRole);
      return metadataRole;
    }

    const resolved = normalizeRole(data?.role) || metadataRole;
    setProfileMissing(!resolved);
    return resolved;
  }

  useEffect(() => {
    function handlePopState() {
      setRoute(currentPath());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      if (!supabase) {
        setIsBooting(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (cancelled) return;

      setSession(data.session);
      if (data.session?.user) {
        setRole(await resolveRole(data.session.user));
      }
      setIsBooting(false);
    }

    loadSession();

    if (!supabase) {
      return () => {
        cancelled = true;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setRole(nextSession?.user ? await resolveRole(nextSession.user) : null);
      if (!nextSession?.user) {
        setProfileMissing(false);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isBooting) return;

    if (session && role && !profileMissing && (route === "/" || loginRoutes[route])) {
      navigate(portalPath(role));
      return;
    }

    const requestedPortal = portalRoutes[route];
    if (requestedPortal && !session) {
      navigate(loginPath(requestedPortal));
    }
  }, [isBooting, profileMissing, role, route, session]);

  async function signInWithGoogle(portal) {
    setAuthError("");

    if (!hasSupabaseConfig || !supabase) {
      setAuthError(authConfigMessage());
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${loginPath(portal)}`,
      },
    });

    if (error) {
      console.error("Google sign-in failed", error);
      setAuthError("Unable to start Google sign-in. Please try again.");
    }
  }

  async function signIn(portal, credentials) {
    setAuthError("");

    if (!hasSupabaseConfig || !supabase) {
      setAuthError(authConfigMessage());
      return;
    }

    setIsSigningIn(true);

    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      setAuthError(friendlyAuthError(error));
      setIsSigningIn(false);
      return;
    }

    const userRole = await resolveRole(data.user);
    if (!userRole) {
      navigate("/");
      setIsSigningIn(false);
      return;
    }

    if (userRole !== portal) {
      await supabase.auth.signOut();
      setSession(null);
      setRole(null);
      setProfileMissing(false);
      setAuthError(`This account is not authorized for the ${portal} portal.`);
      setIsSigningIn(false);
      return;
    }

    setSession(data.session);
    setRole(userRole);
    setIsSigningIn(false);
    navigate(portalPath(portal));
  }

  async function saveRole(selectedRole) {
    setAuthError("");

    if (!session?.user || !supabase) {
      setAuthError("Sign in before selecting a portal role.");
      return;
    }

    setIsSavingRole(true);

    const { error } = await supabase
      .from("profiles")
      .upsert(profilePayload(session.user, selectedRole), { onConflict: "id" });

    if (error) {
      console.error("Unable to save profile role", error);
      setAuthError("Unable to save your portal role. Please try again.");
      setIsSavingRole(false);
      return;
    }

    setRole(selectedRole);
    setProfileMissing(false);
    setIsSavingRole(false);
    navigate(portalPath(selectedRole));
  }

  async function logout() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setRole(null);
    setProfileMissing(false);
    setAuthError("");
    navigate("/");
  }

  const loginPortal = loginRoutes[route];
  const requestedPortal = portalRoutes[route];

  if (isBooting) {
    return (
      <AccessMessage
        title="Loading"
        message="Checking your session..."
        onBack={() => navigate("/")}
      />
    );
  }

  if (route === "/") {
    if (session && profileMissing) {
      return (
        <RoleSelectionPage
          error={authError}
          isLoading={isSavingRole}
          onLogout={logout}
          onSelectRole={saveRole}
        />
      );
    }

    return <LandingPage onSelectPortal={(portal) => navigate(loginPath(portal))} />;
  }

  if (loginPortal) {
    if (session && profileMissing) {
      return (
        <RoleSelectionPage
          error={authError}
          isLoading={isSavingRole}
          onLogout={logout}
          onSelectRole={saveRole}
        />
      );
    }

    return (
      <AuthPage
        portal={loginPortal}
        error={authError}
        isLoading={isSigningIn}
        onBack={() => navigate("/")}
        onGoogleSignIn={signInWithGoogle}
        onSubmit={(credentials) => signIn(loginPortal, credentials)}
      />
    );
  }

  if (!requestedPortal) {
    return (
      <AccessMessage
        title="Page Not Found"
        message="Choose a portal to continue."
        onBack={() => navigate("/")}
      />
    );
  }

  if (!session) {
    return (
      <AuthPage
        portal={requestedPortal}
        error="Sign in to continue."
        isLoading={isSigningIn}
        onBack={() => navigate("/")}
        onGoogleSignIn={signInWithGoogle}
        onSubmit={(credentials) => signIn(requestedPortal, credentials)}
      />
    );
  }

  if (profileMissing) {
    return (
      <RoleSelectionPage
        error={authError}
        isLoading={isSavingRole}
        onLogout={logout}
        onSelectRole={saveRole}
      />
    );
  }

  if (role !== requestedPortal) {
    return (
      <AccessMessage
        title="Unauthorized Portal"
        message={`This account is not authorized for the ${requestedPortal} portal.`}
        onBack={() => navigate("/")}
        onLogout={logout}
      />
    );
  }

  return (
    <div className="app">
      <TopNav portal={requestedPortal} onLogout={logout} />
      <SeasonalBar season={season} setSeason={setSeason} />
      {requestedPortal === "hospital" ? (
        <HospitalPortal season={season} />
      ) : (
        <VendorPortal season={season} />
      )}
    </div>
  );
}
