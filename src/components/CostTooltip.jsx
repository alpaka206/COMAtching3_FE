import React from "react";

function CostTooltip({ cost }) {
    return (
        <div className="cost-tooltip">
        <span>+{cost}포인트</span>
        </div>
    );
}

export default CostTooltip;
