Front-end architecture:

A blank page is loaded (hopefully very quickly, but static site has to wait for polygon caches -- unless I seperate out the motif data from the larger json files -- serverside generated pages will be much faster to first byte, important data tables can be accessed on the fly via json API)

Once prerequisite data is fetched (Promise.all...) a form is built with no target in particular. A 'create new space' button at the top uses the current values of this form to append a 'geodesy' object, attach its propModified listeners, and then reset its props to trigger all of its local style properties initializing, and fetching of geometry, building out its shells of polygons.

Each geodesy also gets a 'propmodified' listener that allows the form to react to programmatic changes made to geodesies. But the form is only focused on one geodesy at a time.

Also at the top of the page, the 'create new space' button is just one "button" of a list of geodesies that can be focused.

On being focused, this button also shows '(eyeball) hide/show' 'trash (trashcan)' buttons to modify the geodesies on page.
On being focused, the 'target' of the form is set, and the 'props' of the target are reset so as to force the form up to date.

## the components are
A small list in the upper right corner, whose list items are created whenever a geodesy is created, each of them is a button that sets the target of the form. A 'create new space' button also remains on this list, and it uses the current state of the form to generate a new geodesy, making it easy to understand how to 'stamp' a space -- hit the new button, and now you're focused on an exact copy sitting on top, adjust the location of that and do it again, each geodesy left behind is its own object with its own ID that can be focused to jump the form.

Rememeber the targets are the 'holes' for pointer-events, so the geodesy element won't receive a focus event unless one of its targets are clicked, letting similar geodesies to stack up but I can still click the one I want to edit... 'bring to top','push to bottom' etc buttons later...

Updating focus updates title of page, pushing the current url to #title, I can watch for history events and focus on whatever the url is pointing to.
Once persistence exists of course these links will work to jump to a particular geodesy within an address space.

### form#layers
a new 'option' is created for every geodesy created, 
clicking any of these options is submitting the form, and when the form submits you get a key:value object to apply,
in this case the whole object is {target: } and the target of the form is updated to match the target prop. 
I can probably capture the submit event on the form, (stop propagation) and re-emit it after converting the data to a shape
emit + details = new props...

'onpropsubmit' 

'create new space' button is one of a list of 'select' options 
### form#props


## Address space considerations.

\40 subnet is one thousand billion addresses. So you could conceivably assign one address per node, so when you make a node a new center, it's address becomes a permalink to that node (of course, that would allow nodes to changes from one 'place' to another... maybe its polite to put up a redirect at an address but its not their responsiblity to keep that address alive. 

Each of the \24 subnets can be overlaid ontop of neighboring address spaces, such that different items can be 'near' each other under different subnets, well identical if you're copying what happens at one address at another subnet.




A list implies an 'end', a trajectory.
Shells and orbs that move around a center imply expansion from a source, and keep that source nearby