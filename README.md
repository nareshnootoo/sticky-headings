# Sticky Headings

`Sticky Headings` its jquery based plugin. Its light weight as compared to other free plugin available on web.

## How to use

* Include jQuery lib.
* Give any specific class to all headings i.e. ```class="sticky-header"```
* Initialize the plugin as ```$('.sticky-header').stickyheadings();```

### How to give offset
```
$('.sticky-header').stickyheadings({offset:10});
```
	
### Callback function for each scroll
 Second parameter in the arguments acts as the callback function. 
 
```
$('.sticky-header').stickyheadings({},onscroll);
```
	
### Callback function after heading got stuck, i.e. onstuck 
 Second parameter in the arguments acts as the callback function. 
 
```
$('.sticky-header').stickyheadings({},null, onstuck);
```
