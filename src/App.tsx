import React from 'react';

import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
    return (
        <div className="container">
            <PomodoroTimer
                defaultPomodoroTime={3600}
                defaultRestTime={100}
                defaultLongRestTime={400}
                cycles={4}
            />
        </div>
    );
}

export default App;
