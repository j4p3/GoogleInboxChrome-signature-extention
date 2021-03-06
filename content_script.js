/*_          _          _      _         _                   
 | |        | |        (_)    | |       | |                  
 | | ___   _| |__  _ __ _  ___| | _____ | | ___   __ _ _   _ 
 | |/ / | | | '_ \| '__| |/ __| |/ / _ \| |/ _ \ / _` | | | |
 |   <| |_| | |_) | |  | | (__|   < (_) | | (_) | (_| | |_| |
 |_|\_\\__,_|_.__/|_|  |_|\___|_|\_\___/|_|\___/ \__, |\__, |
                                                  __/ | __/ |
                                                 |___/ |___/ 
	Google chrome extension by Bob van Luijt
	-- This extension adds a signature to Google Inbox --
	-- issues? Github! https://github.com/kubrickology/GoogleInboxChrome-signature-extention/issues -- */
									
							
var currentVersion = 70; //write version without dots
var currentVersionReadable = '0.7.0';
var imInMd5 = '005111c7f697b47d29d20371dfc80574';
var signature;
var signatureHtml;
var startRunning = false;

chrome.storage.sync.get("inboxSignature", function (obj) {
	signature = obj['inboxSignature'];
	if(!signature){
		signature = 'This is the Kubrickolo.gy (<a href="https://twitter.com/kubrickology" target="_blank">@kubrickology</a>@kubrickology</a>) <strong>html</strong> Google Inbox signature<p>To change: goto the menu in the left top, scroll down and click <strong>signature</strong> above <em>settings</em></p>';
		chrome.storage.sync.set({'inboxSignature': signature}, function(){
			startRunning = true;	
		});
	} else {
		startRunning = true;	
	}
	signatureHtml = '<div class="'+imInMd5+'">'+signature+'</div>';
});

function showTheBigWindow(){
	var removeDraft = document.getElementsByClassName("d0");
	var removeDraftRemove = removeDraft[0].remove();
	
	var iDiv = document.createElement('div');
	iDiv.id = 'createSignatureBlack';
	document.getElementsByTagName('body')[0].appendChild(iDiv);
	
	document.getElementById('createSignatureBlack').innerHTML = '<div id="createSignatureBlack" style="background-color: rgba(10,10,10,.6); bottom: 0; left: 0; position: fixed; right: 0; top: 0; z-index: 50; align-items: center; -webkit-align-items: center; display: -webkit-flex; display: flex; visibility: visible;"><div class="pA" jstcache="0" style="background-color: #fff;border-radius: 2px;box-shadow: 0 0 14px rgba(0,0,0,.24),0 14px 28px rgba(0,0,0,.48);height: 75%;margin: 0 auto;min-height: 260px;overflow: hidden;width: 600px;-webkit-flex-direction: column;flex-direction: column;display: -webkit-flex;display: flex;"><div style="border-bottom: 1px solid #e5e5e5;color: #212121;font-size: 16px;height: 60px;line-height: 60px;padding: 0 24px;text-align: left;">Add a HTML signature</div><div><textarea id="createSignatureText" class="ckeditor" style="width: 96%;height: 160px;margin: 2%; z-index:999999">'+signature+'</textarea><button id="closeTheBigWindow" style="width: 96%;height: 48px;margin: 2%;">Close</button><p><center>Follow us! <a href="https://twitter.com/kubrickology" target="_blank">Twitter</a></center></p></div></div></div>';
	
	$("#createSignatureText").jqte({format: false, fsize: false});
	
	document.getElementById('closeTheBigWindow').addEventListener("click", function(){	
		var md5 = document.getElementsByClassName(imInMd5);
		var md5i = 0;
		
		signature = $('.jqte_editor').html();
		signature = signature.replace("<div>", "<br>");
		signature = signature.replace("</div>", "");
		
		chrome.storage.sync.set({'inboxSignature': signature});
		signatureHtml = '<div class="'+imInMd5+'">'+signature+'</div>';

		while(md5i<md5.length){
			md5[md5i].innerHTML = md5[md5i].innerHTML+'<p>'+signatureHtml+'</p>';
			i++;
		}
	
		document.getElementById('createSignature').addEventListener("click", function(){
			showTheBigWindow();
		});
		
		var x3 = document.getElementById('createSignatureBlack').remove();
	});
	
	/*
	$('.jqte_editor').keyup(function(){
		var md5 = document.getElementsByClassName(imInMd5);
		var md5i = 0;
		chrome.storage.sync.set({'inboxSignature': document.getElementById('createSignatureText').value});
		signature = document.getElementById('createSignatureText').value;
		signatureHtml = '<div class="'+imInMd5+'">'+signature+'</div>';
		while(md5i<md5.length){
			md5[md5i].innerHTML = md5[md5i].innerHTML+'<p>'+signatureHtml+'</p>';
			i++;
		}
	});
	*/
}

function addTheSignature(){
	$('[id^="er-"]').each(function(index, element) {
		if($(element).html().indexOf(imInMd5)=='-1'){
        	$(element).html($(element).html()+'<p>'+signatureHtml+'</p>');
		}
    });
}

setInterval(function(){
	if(startRunning===true){
		addTheSignature();
	}
}, 20);

$(document).ready(function() {
	var path = chrome.extension.getURL('jquery-te.css');
	if(!$('#createSignature').length){
		$('.kl').find('.kp').last().append('<li class="eS" id="signature_eR"><div class="fT o6 hb" jstcache="0"></div><div class="mE" id="createSignature" jstcache="0">Signature</div></li>');
	}
	$('#createSignature').click(function(){
		showTheBigWindow();
	});
	$('head').append($('<link>')
		.attr("rel","stylesheet")
		.attr("type","text/css")
		.attr("href", path));

	//
	//Set the info box
	//
	chrome.storage.sync.get("inboxSignatureWelcome", function (obj) {
		inboxSignatureWelcome = parseInt(obj['inboxSignatureWelcome']);
		//chrome.storage.sync.remove('inboxSignatureWelcome');
		if(inboxSignatureWelcome<currentVersion || isNaN(inboxSignatureWelcome)===true){
			if(!$('.bigOverlaySignature').length){
				$('#mO').append('<div class="bigOverlaySignatureBlack"></div><div class="bigOverlaySignature"><h1>Thanks for installing the signature plugin!</h1><strong>Current version:</strong><br>'+currentVersionReadable+'<p><strong>Usage</strong><br>Go into the left menu and scroll down, there you can add your signature.<p><strong>Contact</strong><br><a href="https://chrome.google.com/webstore/detail/google-inbox-signature-ex/eolghmadamoikjgebgkgjbikgfnlflhm" target="_blank">Issues</a><br><a href="https://github.com/kubrickology/GoogleInboxChrome-signature-extention/issues" target="_blank">Vote</a><br><a href="https://twitter.com/kubrickology" target="_blank">Contact me</a></div>');
				$('.bigOverlaySignatureBlack').click(function(){
					$('.bigOverlaySignatureBlack').fadeOut('1200');
					$('.bigOverlaySignature').fadeOut('1200');
					chrome.storage.sync.set({'inboxSignatureWelcome': currentVersion});
				});
			}
		}
	});
	
});

