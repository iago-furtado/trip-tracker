// Collections of frontend javascript functions

/* function confirmDelete(itineraryId) {
    const confirmDelete = confirm('Are you sure you want to delete this itinerary?');
    if (confirmDelete) {
        // Perform delete action (you can use AJAX to send a request to the server)
        window.location.href = `/private/delete/${itineraryId}`;
    }
} */
function confirmDelete(){
    return confirm("Are you sure you want to delete this itinerary?")
}
