(function($, undefined)
	{
		var Feedback = (function()
			{	
				function Feedback()
				{
					this.data = {};
				}
				
				Feedback.prototype.url = null;
				
				Feedback.prototype.addMessage = function(message)
				{
					this.data.message = message;
				};
				
				Feedback.prototype.addUrl = function(url)
				{
					if(!url)
					{
						url = location.href;
					}
					this.data.url = url;
				};
				
				Feedback.addDOMObject = function(dom_object)
				{
					
				};
				
				Feedback.addAdditionalData = function()
				{
					
				};
				
				Feedback.prototype.send = function()
				{
					if(!this.url) { return; }
					
					if(!this.data.url)
					{
						this.addUrl();
					}
					
					console.log(this.data);
					$.post(this.url, this.data);
				};
				
				return Feedback;
			}
		)();
		
		
		// as soon as the dom is ready
		$(document).ready
		(
			function()
			{
				Feedback.prototype.url = 'http://localhost:3000/api/feedback/log/';
				console.log(new Feedback());
				var feedback_button = $('<div id="feedback_button">Feedback</div>').on('click', function()
					{
						console.log('feedback');
						var feedback  = new Feedback();
						console.log(feedback);

						feedback.addMessage('hello');
						feedback.send()
					}
				);
				$('body').append(feedback_button);
				console.log(feedback_button);
			}
		);
	}
)(jQuery);