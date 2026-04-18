import React, { useState, useEffect } from "react";
import Data from "./data.json";

function Dashboard() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const items = Object.entries(Data);

  const filteredItems = items.filter(
    ([code, item]) =>
      code.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.itemInfo.itemName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
  );

  const handleSelectItem = (code, item) => {
    setSelectedCode(code);
    setSelectedItem(item);
    setInputValue(`${code} - ${item.itemInfo.itemName}`);
  };

  //  Badge Style
  const badgeStyle = (bg) => ({
    padding: "4px 8px",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: bg,
  });

  const cell = { border: "1px solid #0e3097", padding: "8px" };

  return (
    <div style={{ width: "90%", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>ITEM DASHBOARD</h2>

      {/* Summary Cards */}
      {selectedItem && (
        <div style={{ marginBottom: "20px" }}>
          <h3>
            Selected Item: {selectedCode} - {selectedItem.itemInfo.itemName}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            <div style={{ ...card }}>
              <h4>PO Count</h4>
              <p>{selectedItem.purchaseOrders.length}</p>
            </div>
            <div style={{ ...card }}>
              <h4>GRN Count</h4>
              <p>{selectedItem.grn.length}</p>
            </div>
            <div style={{ ...card }}>
              <h4>Invoice Count</h4>
              <p>{selectedItem.invoice.length}</p>
            </div>
            <div style={{ ...card }}>
              <h4>Return Count</h4>
              <p>{selectedItem.returns.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search item..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #c56666",
          borderRadius: "6px",
        }}
      />

      {/* Dropdown */}
      <div
        style={{
          border: "1px solid #c08d8d",
          borderRadius: "6px",
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {filteredItems.map(([code, item]) => (
          <div
            key={code}
            onClick={() => handleSelectItem(code, item)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            {code} - {item.itemInfo.itemName}
          </div>
        ))}
      </div>

      {/* Tables */}
      {selectedItem && (
        <>
          {/* PO TABLE */}
          <h3>Purchase Orders</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={cell}>PO No</th>
                <th style={cell}>Date</th>
                <th style={cell}>Authorized</th>
                <th style={cell}>Qty</th>
                <th style={cell}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedItem.purchaseOrders.map((po) => (
                <tr key={po.poNo}>
                  <td style={cell}>{po.poNo}</td>
                  <td style={cell}>{po.date}</td>
                  <td style={cell}>
                    <span
                      style={badgeStyle(
                        po.isAuthorized ? "green" : "orange"
                      )}
                    >
                      {po.isAuthorized ? "Authorized" : "Pending"}
                    </span>
                  </td>
                  <td style={cell}>{po.qty}</td>
                  <td style={cell}>{po.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* GRN TABLE */}
          <h3>GRN</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={cell}>GRN No</th>
                <th style={cell}>PO No</th>
                <th style={cell}>Date</th>
                <th style={cell}>Authorized</th>
                <th style={cell}>Batch</th>
                <th style={cell}>Qty</th>
                <th style={cell}>Amount</th>
                <th style={cell}>Paid</th>
              </tr>
            </thead>
            <tbody>
              {selectedItem.grn.map((g) => (
                <tr key={g.grnNo}>
                  <td style={cell}>{g.grnNo}</td>
                  <td style={cell}>{g.poNo}</td>
                  <td style={cell}>{g.date}</td>
                  <td style={cell}>
                    <span
                      style={badgeStyle(
                        g.isAuthorized ? "green" : "orange"
                      )}
                    >
                      {g.isAuthorized ? "Authorized" : "Pending"}
                    </span>
                  </td>
                  <td style={cell}>{g.batch}</td>
                  <td style={cell}>{g.qty}</td>
                  <td style={cell}>{g.amount}</td>
                  <td style={cell}>
                    <span
                      style={badgeStyle(g.isPaid ? "green" : "red")}
                    >
                      {g.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* INVOICE TABLE */}
          <h3>Invoices</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={cell}>Inv No</th>
                <th style={cell}>Name</th>
                <th style={cell}>Date</th>
                <th style={cell}>Qty</th>
                <th style={cell}>Amount</th>
                <th style={cell}>Paid</th>
              </tr>
            </thead>
            <tbody>
              {selectedItem.invoice.map((inv) => (
                <tr key={inv.invNo}>
                  <td style={cell}>{inv.invNo}</td>
                  <td style={cell}>{inv.name}</td>
                  <td style={cell}>{inv.date}</td>
                  <td style={cell}>{inv.qty}</td>
                  <td style={cell}>{inv.totalAmount}</td>
                  <td style={cell}>
                    <span
                      style={badgeStyle(inv.isPaid ? "green" : "red")}
                    >
                      {inv.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* RETURNS TABLE */}
          <h3>Returns</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={cell}>Return No</th>
                <th style={cell}>Invoice</th>
                <th style={cell}>Date</th>
                <th style={cell}>Qty</th>
                <th style={cell}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedItem.returns.map((r) => (
                <tr key={r.returnNo}>
                  <td style={cell}>{r.returnNo}</td>
                  <td style={cell}>{r.invNo}</td>
                  <td style={cell}>{r.date}</td>
                  <td style={cell}>{r.qty}</td>
                  <td style={cell}>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

// small reusable style
const card = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
  backgroundColor: "#e8c2c2",
};

export default Dashboard;