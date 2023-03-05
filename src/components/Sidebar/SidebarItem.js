import React from "react";

function SidebarItem({ menu }) {
  return (
    <div className="sidebar-item">
      <p style={{ fontWeight: "700" }}>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;
