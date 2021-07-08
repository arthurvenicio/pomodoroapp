import React from 'react';

import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
    return (
        <div className="container">
            <PomodoroTimer
                defaultPomodoroTime={10}
                defaultRestTime={2}
                defaultLongRestTime={5}
                cycles={4}
            />
        </div>
    );
}

export default App;
