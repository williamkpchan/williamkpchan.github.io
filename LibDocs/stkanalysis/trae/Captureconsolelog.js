        // Capture console.log output to display on page
        const output = document.getElementById('output');
        const originalLog = console.log;
        console.log = function(message) {
            originalLog.apply(console, arguments);
            output.innerHTML += JSON.stringify(message, null, 2) + '<br><br>';
        };
