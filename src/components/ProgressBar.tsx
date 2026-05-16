// @ts-nocheck
import { progressBar, progressBarFill } from '../css/components/ProgressBar.css';

const ProgressBar = ({ progress }) => {
    return (
        <div className={progressBar}>
        <div className={progressBarFill} style={{ width: `${progress}%` }} />
        </div>
    );
};

export default ProgressBar;
