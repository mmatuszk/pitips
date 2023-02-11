// A dictionary to store pairs of words and tooltips
var wordTooltipDictionary = {
"pvc": "Extra, early beats that come from the lower chambers of the heart, \
causing the heart to beat in an irregular pattern and a fluttering or pounding \
in the chest. PVCs are usually harmless, but in some cases, they can be a sign of a more serious heart problem.",

"atrial flutter": "A type of heart rhythm problem where the upper chambers \
of the heart beat too fast and in a regular pattern, causing symptoms like shortness \
of breath, chest pain, and feeling faint.",

"lvh": "Left ventricular hypertrophy (LVH) is a condition where the left ventricle of \
your heart becomes thick and stiff. The left ventricle is the main pumping chamber of \
your heart and is responsible for pumping blood to the rest of your body. When the left \
ventricle becomes thick, it can't pump blood as efficiently as it should. \
This can lead to problems like high blood pressure, heart failure, and an increased \
risk of heart attack or stroke. LVH is often caused by conditions like high blood pressure, \
aortic stenosis, or hypertrophic cardiomyopathy.",

"sinus bradycardia" : "Sinus bradycardia, or a slow heart rate, can be a sign \
of cardiovascular health in young, healthy adults and endurance athletes. \
It can also be a sign of an underlying condition requiring medical attention.",

"sinus tachycardia" : "Sinus tachycardia is a common condition that happens sometimes \
in response to stressful situations. Your heart beats more than 100 times per minute, \
but usually returns to normal after the stressful event has passed. If your symptoms \
continue when your body is at rest, it’s a good idea to see your healthcare provider."
};
  

function findAllOccurrences(str, word) {
    let results = [];
    let wordLower = word.toLowerCase();
    let strLower = str.toLowerCase();
    let startIndex = 0;
  
    while (startIndex >= 0) {
      startIndex = strLower.indexOf(wordLower, startIndex);
      if (startIndex >= 0) {
        results.push(startIndex);
        startIndex++;
      }
    }
  
    return results;
}
  

// Function will put span tags with class tooltip and title=tooltip around word.
// Word will be matched regardless of case and the orignial case will be preserved
function addTooltipsToText(word, tooltip, text) {
    var list = findAllOccurrences(text, word);

    for (var i = list.length - 1; i >= 0; i--) {
        var wordIndex = list[i];

        // Get the original case of the word
        var originalWord = text.slice(wordIndex, wordIndex + word.length);

        // Replace the word in the text with the original case of the word and span tags around it
        var span = '<span class="tooltip blue-box" title="'+tooltip+'">' + originalWord + "</span>"     
        
        text = text.slice(0, wordIndex) + span + text.slice(wordIndex + word.length);
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
        if (this.nodeType === Node.TEXT_NODE && !$(this).parent().is('a')) {
            console.log($(this).parent().is('a'));
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
    console.log('loaded');
    setTimeout(function() {
        attachTooltipsToDocument();
        $( document ).tooltip();
        }, 1000);
    //   attachTooltipsToDocument();
    //   $( document ).tooltip();
  });