function generateFilename(nameHeader) {
    const timestamp = Date.now();
    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    // Extract the year, month, and day components
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    // Combine the components to form YYMMDD format
    const yymmdd_hhmm = `${year}${month}${day}_${hours}${minutes}`;
    //const yymmdd = `${year}${month}${day}`;

    const filePath = `nameHeader_${yymmdd_hhmm}.html`;
}
