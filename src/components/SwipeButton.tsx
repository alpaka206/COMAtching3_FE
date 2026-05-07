// @ts-nocheck

function SwipeButton({ isReady, onSwipe }) {
    const handleSwipe = () => {
        if (isReady) {
        onSwipe();
        }
    };

    return (
        <div
        className={`swipe-button ${isReady ? "active" : ""}`}
        onMouseDown={handleSwipe}
        onTouchStart={handleSwipe}
        >
        <img src="/path/to/icon.svg" alt="Swipe Icon" />
        <span>{isReady ? "밀어서 커플되기" : "조건을 선택해 주세요"}</span>
        </div>
    );
}

export default SwipeButton;
