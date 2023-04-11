# TTR

Table Top Repository is a project to create web apps designed to help table top rpg players.

dataTable/Search Table:
This app is a dynamic way to display sets of information. The original use case was a table that allowed players to filter through spells from Pathfinder 2e, spells could be filtered by name with regex or by level, school, or source using a drop down select. Part way through this project I decided to make the app general purpose and try to accept a wide variety of data sets and filter them in a number of different ways.

The app can be configured with either a simple API endpoint passing in an object wih the url, method, and headers or alternatively a local json file can be loaded. If the response includes additional data the path to the intended data can be defined.

Setting filters also defines which fields will be displayed, ie if a field in the data set does not have it's filter defined it will not appear in the table. A field is chosen by it's name in the object, this means that if the object has multiple fields with the same name it will be invalid (a parameter has been included for "extensions" ie generic field names within an object of a desired field, for example fruit{value: "banana"} the extension is "value"). Filters can be set to be select or textbox with textbox being the default behavior. Any filters set to select will generate options based on all the unique values stored in that field. Text box responses work on a simple case insensitive regex.

Additional styling required for this project. I'm considering a future update to make a GUI config screen.


GM Map (WIP):
This app is designed to provide game masters a way to keep track of their in game locations and any items/people/geography on them. The user will upload an image to serve as the map itself then click on points of interest on the map to define what is there. 