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
				
				Feedback.prototype.addDOMObject = function(DOMObject)
				{
					var selector = feedback_functions.getSelector(DOMObject),
						$obj = $(DOMObject),
						html;
					this.data.DOMObject = {};
					this.data.DOMObject.selector = selector;
					if(DOMObject.outerHTML)
					{
						html = DOMObject.outerHTML;
					}
					else
					{
						html = '{INNER HTML}: '.$obj.html();
					}
					this.data.DOMObject.html = html;
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
		
		var feedback_functions =
			{
				previous_element: $([]),
				previous_element_border: 'none',
				drawBox: function(el)
				    {
						// avoid error when the element is not attached a document
				        if (!el || !el.parentNode)
				            return;
							
						var $el = $(el);
						if($el == this.previous_element)
						{
							return;
						}
						else
						{
							this.previous_element.css('border', this.previous_element_border);
							this.previous_element_border = $el.css('border');
							$el.css('border', '1px solid red');
							this.previous_element = $el;
						}
				    },
					//from firebug lite
					getElementCSSSelector: function(element)
					{
					    var label = element.localName.toLowerCase();
					    if (element.id)
					        label += "#" + element.id;
					    if (element.hasAttribute("class"))
					        label += "." + element.getAttribute("class").split(" ")[0];

					    return label;
					},
					getSelector: function(elem)
					{
						var selectors = [];
						selectors.push(this.getElementCSSSelector(elem));
						elem = elem.parentNode;
						
						for(var i = 1; i <= 2; i++)
						{
							if(!elem)
							{
								break;
							}
							if(elem == document)
							{
								break;
							}
							else
							{
								selectors.push(this.getElementCSSSelector(elem));
								elem = elem.parentNode;
							}
						}
						selectors.reverse();
						return selectors.join(' ');
					}
			};
		
		
		// as soon as the dom is ready
		var $doc = $(document);
		$doc.ready
		(
			function()
			{
				Feedback.prototype.url = 'http://localhost:3000/api/feedback/log/';
				
				var feedback;			

				var feedback_choose_element = function(callback)
				{
					$doc.on('click.feedback', '*:not(#feedback_button)', function(e)
						{
							e.preventDefault();
							e.stopPropagation();
							feedback.addDOMObject(this);
							
							$doc.off('click.feedback').off('mousemove.feedback');
							
							callback();
							return;
						}
					);
					
					$doc.on('mousemove.feedback', function(e)
						{
							feedback_functions.drawBox(e.target);
						}
					);
				};
				
				var feedback_button = $('<div id="feedback_button">Feedback</div>').on('click', function(e)
					{
						e.stopPropagation();
						feedback  = new Feedback();
						console.log(feedback);
						
						feedback_choose_element(function()
							{
								feedback.send();
							}
						);
						feedback.addMessage('hello');
						
					}
				);
				$('body').append(feedback_button);
			}
		);
	}
)(jQuery);