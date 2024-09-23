document.addEventListener('DOMContentLoaded', () => {
    const chapters = document.querySelectorAll('.sidebar ul li');
    const mainContent = document.querySelector('.main-content');

    // Function to load a specific chapter HTML file
    const loadChapter = (chapterFile) => {
        fetch(`chapters/${chapterFile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Chapter not found');
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data; // Inject the chapter content into the main content area
            })
            .catch(error => {
                console.error('Error loading chapter:', error);
                mainContent.innerHTML = '<p>Error loading the chapter. Please try again later.</p>';
            });
    };

    // Event listeners for chapter selection
    chapters.forEach(chapter => {
        chapter.addEventListener('click', () => {
            const chapterFile = chapter.getAttribute('data-chapter'); // Get the file from the data-chapter attribute

            // Remove 'selected' class from all chapters, then add to the clicked one
            chapters.forEach(ch => ch.classList.remove('selected'));
            chapter.classList.add('selected');

            // Load the clicked chapter
            loadChapter(chapterFile);
        });
    });

    // Automatically load the first chapter when the page loads
    loadChapter('chapter1.html');
});