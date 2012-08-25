/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete">
*
* Optionally, you can use a jQuery selector to specify a field that can
* be updated with the element id whenever you find a matching value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete" data-id-element="#id_field">
*/
(function(a){a.fn.railsAutocomplete=function(){return this.live("focus",function(){this.railsAutoCompleter||(this.railsAutoCompleter=new a.railsAutocomplete(this))})};a.railsAutocomplete=function(a){_e=a;this.init(_e)};a.railsAutocomplete.fn=a.railsAutocomplete.prototype={railsAutocomplete:"0.0.1"};a.railsAutocomplete.fn.extend=a.railsAutocomplete.extend=a.extend;a.railsAutocomplete.fn.extend({init:function(b){b.delimiter=a(b).attr("data-delimiter")||null;a(b).autocomplete({source:function(g,d){a.getJSON(a(b).attr("data-autocomplete"),
function(){var c={},e=a(b).attr("data-autocomplete-send");a(a(e).serializeArray()).each(function(a,b){c[b.name]=b.value});c.term=g.term.split(b.delimiter).pop().replace(/^\s+/,"");return c}(),function(){a(arguments[0]).each(function(c,e){var d={};d[e.id]=e;a(b).data(d)});d.apply(null,arguments)})},search:function(){if(this.value.split(b.delimiter).pop().replace(/^\s+/,"").length<(a(b).attr("data-autocomplete-min-length")||2))return!1},focus:function(){return!1},select:function(g,d){var c=this.value.split(b.delimiter);
c.pop();c.push(d.item.value);if(null!=b.delimiter)c.push(""),this.value=c.join(b.delimiter);else if(this.value=c.join(""),a(this).attr("data-id-element")&&a(a(this).attr("data-id-element")).val(d.item.id),a(this).attr("data-update-elements")){var c=a(this).data(d.item.id.toString()),e=a.parseJSON(a(this).attr("data-update-elements")),f;for(f in e)a(e[f]).val(c[f])}var h=this.value;a(this).bind("keyup.clearId",function(){a(this).val().trim()!=h.trim()&&(a(a(this).attr("data-id-element")).val(""),a(this).unbind("keyup.clearId"))});
a(this).trigger("railsAutocomplete.select",d);return!1}})}});a(document).ready(function(){a("input[data-autocomplete]").railsAutocomplete()})})(jQuery);
