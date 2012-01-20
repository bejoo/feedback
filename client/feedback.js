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
				
				Feedback.prototype.addDOMObject = function(dom_object)
				{
					
				};
				
				Feedback.prototype.addAdditionalData = function()
				{
					
				};
				
				Feedback.prototype.addScreenshot = function()
				{
						//http://html2canvas.hertzen.com/
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
		var $doc = $(document);
		$doc.ready
		(
			function()
			{
				Feedback.prototype.url = 'http://localhost:3000/api/feedback/log/';

				var feedback_choose_element = function(callback)
				{
					$doc.on('click.feedback', '*:not(#feedback_button)', function(e)
						{
							console.log('no');
							e.preventDefault();
							e.stopPropagation();
							console.log(e);
							console.log(window);
							console.log($(this).selector);
							
							callback();
							$doc.off('click.feedback');
							return;
						}
					);
				};
				
				var feedback_button = $('<div id="feedback_button">Feedback</div>').on('click', function(e)
					{
						e.stopPropagation();
						var feedback  = new Feedback();
						console.log(feedback);
						
						feedback_choose_element(function(){});
						feedback.addMessage('hello');
						feedback.send()
					}
				);
				$('body').append(feedback_button);
			}
		);
	}
)(jQuery);