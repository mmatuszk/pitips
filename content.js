// A dictionary to store pairs of words and tooltips
var wordTooltipDictionary = {
"marcin": "first name",
"matuszkiewicz": "last name",
};

// Function will put span tags with class tooltip and title=tooltip around word.
// Word will be matched regardless of case and the orignial case will be preserved
function addTooltipsToText(word, tooltip, text) {
    // Convert the text to lowercase
    var lowerCaseText = text.toLowerCase();

    // Find the index of the first occurrence of the word in the lowercase text
    var wordIndex = lowerCaseText.indexOf(word.toLowerCase());

    // Repeat the process for all occurrences of the word in the text
    while (wordIndex !== -1) {
    // Get the original case of the word
    var originalWord = text.slice(wordIndex, wordIndex + word.length);

    // Replace the word in the text with the original case of the word and span tags around it
    var span = '<span class="tooltip" title="'+tooltip+'">' + originalWord + "</span>"
    console.log(span);
    text = text.slice(0, wordIndex) + span + text.slice(wordIndex + word.length);

    // Find the next occurrence of the word in the lowercase text
    lowerCaseText = lowerCaseText.slice(wordIndex + word.length);
    wordIndex = lowerCaseText.indexOf(word.toLowerCase());
    }

    return text;
}


// Function to attach tooltips to words on the page
function attachTooltipsToDocument() {
    // Use the jQuery .contents() method to get all child nodes of the body element
    var bodyChildNodes = $("body").contents();

    // Define a recursive function to traverse the child nodes
    function traverseNodes(nodes) {
    nodes.each(function() {
        // Check if the current node is a text node
        if (this.nodeType === Node.TEXT_NODE) {
            // Log the text content and parent tag name of the node to the console
            // console.log("Text: " + this.textContent + ", Parent Tag: " + this.parentNode.tagName);
            var text = $(this).text();

            // Replace words with tooltips
            for (var word in wordTooltipDictionary) {
                var text = addTooltipsToText(word, wordTooltipDictionary[word], text);
            }
    
            // Set the updated text content for the node
            $(this).replaceWith(text);
        } else {
        // If the node is not a text node, traverse its child nodes
        traverseNodes($(this).contents());
        }
    });
    }

    // Call the recursive function to traverse all child nodes of the body
    traverseNodes(bodyChildNodes);
}



  // Call the attachTooltips function when the page is ready
  $(document).ready(function() {        
    setTimeout(function() {
        attachTooltipsToDocument();
        $( document ).tooltip();
        }, 1000);
    //   attachTooltipsToDocument();
    //   $( document ).tooltip();
  });