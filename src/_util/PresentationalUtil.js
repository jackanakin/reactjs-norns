import $ from 'jquery';

/**
 * 
 * @param {<li> id to remove class} liRemove 
 * @param {<div> id to remove class} tabRemove 
 * @param {<li> id to add class} liActive 
 * @param {<div> id to add class} tabActive 
 */
export function gTriggerTabPanel(liRemove, tabRemove, liAdd, tabAdd) {
    $('#' + liRemove).removeClass("active");
    $('#' + liAdd).addClass("active");

    $('#' + tabRemove).removeClass("active");
    $('#' + tabRemove).removeClass("in");
    $('#' + tabAdd).addClass("active");
    $('#' + tabAdd).addClass("in");
}