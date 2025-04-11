class AlarmClock {
    constructor() {
        this.alarms = [];
        this.loadAlarms();
        this.initializeClock();
        this.start();
    }

    initializeClock() {
        const updateClock = () => {
            const now = new Date();
            const clockDisplay = document.getElementById('clock');
            clockDisplay.textContent = now.toLocaleTimeString();
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    addAlarm(hour, minute, days, pattern = 'standard') {
        const alarm = {
            id: Date.now(),
            hour: hour,
            minute: minute,
            days: days,
            enabled: true,
            pattern: pattern
        };
        this.alarms.push(alarm);
        this.saveAlarms();
        this.renderAlarms();
        return alarm.id;
    }

    removeAlarm(alarmId) {
        this.alarms = this.alarms.filter(alarm => alarm.id !== alarmId);
        this.saveAlarms();
        this.renderAlarms();
    }

    toggleAlarm(alarmId) {
        const alarm = this.alarms.find(a => a.id === alarmId);
        if (alarm) {
            alarm.enabled = !alarm.enabled;
            this.saveAlarms();
            this.renderAlarms();
        }
    }

    saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
    }

    loadAlarms() {
        const savedAlarms = localStorage.getItem('alarms');
        if (savedAlarms) {
            this.alarms = JSON.parse(savedAlarms);
            this.renderAlarms();
        }
    }

    start() {
        setInterval(() => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentDay = now.getDay();

            this.alarms.forEach(alarm => {
                if (alarm.enabled &&
                    alarm.hour === currentHour &&
                    alarm.minute === currentMinute &&
                    alarm.days.includes(currentDay)) {
                    this.triggerAlarm(alarm);
                }
            });
        }, 1000);
    }

    triggerAlarm(alarm) {
        alert(`Alarm! ${alarm.hour}:${alarm.minute}`);
    }

    renderAlarms() {
        const container = document.getElementById('alarmList');
        container.innerHTML = '';
        
        this.alarms.forEach(alarm => {
            const div = document.createElement('div');
            div.className = `alarm-item ${alarm.enabled ? 'active' : 'disabled'}`;
            
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const selectedDays = alarm.days.map(d => days[d]).join(', ');
            
            div.innerHTML = `
                <span>${alarm.hour.toString().padStart(2, '0')}:${alarm.minute.toString().padStart(2, '0')} 
                      (${selectedDays}) - ${alarm.pattern}</span>
                <div>
                    <button onclick="alarmClock.toggleAlarm(${alarm.id})" class="btn-primary">
                        ${alarm.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button onclick="alarmClock.removeAlarm(${alarm.id})" class="btn-primary">
                        Delete
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// Initialize the alarm clock
const alarmClock = new AlarmClock();

// Function to create new alarm from form
function createAlarm() {
    const timeInput = document.getElementById('alarmTime');
    const [hours, minutes] = timeInput.value.split(':').map(Number);
    
    const selectedDays = Array.from(document.querySelectorAll('.days-selector input:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    const pattern = document.getElementById('alarmPattern').value;
    
    if (selectedDays.length === 0) {
        alert('Please select at least one day');
        return;
    }
    
    alarmClock.addAlarm(hours, minutes, selectedDays, pattern);
}