$(document).ready(function()
{
	$('.domhtml').click(function()
	{
		$(this).html($(this).text());
	});
	
	$('.domobj').click(function()
	{
		$(this).next('.domhtml').show();
	});

});