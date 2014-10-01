(function() {
	var app = angular.module('gemStore', []);

	app.controller('SettingsController', function()
	{
		this.BMSettings = BookmarkSettings;
		this.BMSettingsSwitch = DashboardSettingsSwitch;
	    this.DBSettings = DashboardSettings;
	});

	var BookmarkSettings = [
    { name: 'Display screenshots', 
      checked: false },
    { name: 'Archive deleted bookmarks', 
      checked: false },
	];
  
	var DashboardSettings = [
	{ name: 'Display Search icon', 
      checked: false },
    { name: 'Display Add Bookmark icon', 
      checked: true },
	{ name: 'Display Settings icon', 
	  checked: false },
	{ name: 'Display Help icon', 
	  checked: true },
	/*{ name: 'Sort By', 
	  options: [{"Most viewed"},{"Categories"}] },*/
	];
	var DashboardSettingsSwitch = [
    { name: 'Auto refresh', 
      checked: false },
    { name: 'Infinite scrolling', 
      checked: false },
    { name: 'Desktop notifications', 
      checked: false },
	];
})();