import { useState } from "react";
import { vendorCatalog } from "../../data/mockData.js";

export default function CatalogTab() {
  const [catalog, setCatalog] = useState(vendorCatalog);
  const [editingId, setEditingId] = useState(null);
  const [draftStock, setDraftStock] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", batchId: "", unitPrice: "", stock: "", grade: "A" });

  function startEdit(item) {
    setEditingId(item.id);
    setDraftStock(String(item.stock));
  }

  function saveStock(id) {
    setCatalog((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stock: Number(draftStock) || 0 } : c))
    );
    setEditingId(null);
  }

  function addBatch() {
    if (!newItem.name || !newItem.batchId) return;
    setCatalog((prev) => [
      ...prev,
      {
        id: `c${prev.length + 1}-${Date.now()}`,
        name: newItem.name,
        batchId: newItem.batchId,
        unitPrice: Number(newItem.unitPrice) || 0,
        stock: Number(newItem.stock) || 0,
        grade: newItem.grade,
      },
    ]);
    setNewItem({ name: "", batchId: "", unitPrice: "", stock: "", grade: "A" });
    setShowAdd(false);
  }

  return (
    <div>
      <h1>Inventory Catalog</h1>

      <div className="panel">
        <div className="panel-header" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Stocked Items</span>
          <button className="btn" onClick={() => setShowAdd((s) => !s)}>
            {showAdd ? "Cancel" : "+ Add New Batch"}
          </button>
        </div>

        {showAdd && (
          <div style={{ padding: 16, borderBottom: "1px solid var(--gray-200)" }}>
            <div className="form-row">
              <input
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <input
                placeholder="Batch ID"
                value={newItem.batchId}
                onChange={(e) => setNewItem({ ...newItem, batchId: e.target.value })}
              />
            </div>
            <div className="form-row">
              <input
                placeholder="Unit Price"
                type="number"
                value={newItem.unitPrice}
                onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
              />
              <input
                placeholder="Stock Available"
                type="number"
                value={newItem.stock}
                onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
              />
              <select
                value={newItem.grade}
                onChange={(e) => setNewItem({ ...newItem, grade: e.target.value })}
              >
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={addBatch}>Save Batch</button>
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Batch ID</th>
              <th>Unit Price</th>
              <th>Stock Available</th>
              <th>Quality Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {catalog.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.batchId}</td>
                <td>₹{item.unitPrice}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      className="select-inline"
                      style={{ width: 90 }}
                      value={draftStock}
                      onChange={(e) => setDraftStock(e.target.value)}
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td>{item.grade}</td>
                <td>
                  {editingId === item.id ? (
                    <button className="btn btn-primary" onClick={() => saveStock(item.id)}>
                      Save
                    </button>
                  ) : (
                    <button className="btn" onClick={() => startEdit(item)}>
                      Update Stock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
