// ==UserScript==
// @name        Blackpearl APK Scrapper
// @version     1.0.0
// @description Android App Template
// @author      BlackpearlBot
// @icon        https://blackpearl.biz/favicon.png
// @include     https://blackpearl.biz/*
// @include     https://*.google.com/*
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// ==/UserScript==

var Generate_Template = `
<div id="gmPopupContainer">
<a href='javascript:void(0)' onclick='$("#gmPopupContainer").hide ();' class="close"></a>
<form>
<input type="text" id="gplaylink" value="" class="field" placeholder="Enter Link of APK" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Link of APK'"
<input type="text" id="screensLinks" value="" class="field" placeholder="Screenshot Links" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Screenshot Links'">
<input type="text" id="ddl" value="" class="field" placeholder="Download Link" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Download Link'">
<span>DownCloud</span>
<label class="switch">
<input type="checkbox" id="Downcloud" value="Downcloud" checked></input>
<span class="slider round"></span></label>&nbsp;<br></br>
<input type="number" id="HideReactScore" min="0" max="100" value="0"> HideReactScore
<input type="number" id="HidePosts" min="0" max="50" value="0"> HidePosts<br>
<p id="myNumberSum">&nbsp;</p>
<button id="gmAddNumsBtn" type="button">Generate Template</button>
<div class="divider"/>
<button id="gmClearBtn" type="reset">Clear</button>
</form>
</div>
`
$("body").append (Generate_Template);
    //--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var link = $("#gplaylink").val();
    var ddl = $("#ddl").val ();
    var hidereactscore = $("#HideReactScore").val ();
    var hideposts = $("#HidePosts").val ();
    GM_xmlhttpRequest({
        method: "GET",
        url: link,
        onload: function(response) {
            var test = response.responseText;
            let parser = new DOMParser();
            let parsedHtml = parser.parseFromString(test, 'text/html');
            var images = parsedHtml.getElementsByTagName("img");
            for (var logoimg of images){
                var logoattr = logoimg.alt;
                if (logoattr == "Cover art") {
                    var logo = logoimg.srcset.replace("-rw", '').replace(" 2x",'');
                }
            }
            var title = parsedHtml.getElementsByClassName("AHFaub")[0].innerText;
            var dev = parsedHtml.getElementsByClassName("T32cc UAO9ie")[0].innerText;
            var category = parsedHtml.getElementsByClassName("T32cc UAO9ie")[1].innerText;
            var screens = [];
            for (var screen of images){
                var screenattr = screen.alt;
                if (screenattr == "Screenshot Image") {
                    if (!screen.dataset | (!screen.dataset.srcset)){
                        screens.push(screen.srcset.replace("-rw", '').replace(" 2x",'') + '\n');
                    } else {
                        screens.push(screen.dataset.srcset.replace("-rw", '').replace(" 2x",'') + '\n');
                    }
                }
            }
            var discription = parsedHtml.getElementsByClassName("DWPxHb")[0].textContent;
            var rating = parsedHtml.getElementsByClassName("BHMmbe")[0].innerText;
            console.log("Logo is ~~~~"+logo);
            console.log("Title is ~~~~"+title);
            console.log("Screenshots are  ~~" + screens);
            console.log("Developer is ~~~~"+dev);
            console.log("Category name is ~~~~"+category);
            console.log("Discription is ~~~~"+discription);
            console.log("Rating is ~~~~"+rating);
        }});

});

$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
        $("#gmPopupContainer").hide ();
    }
});

//--- CSS styles make it work...
GM_addStyle ( "                                                   \
    @media screen and (min-width: 300px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                1em;                          \
            width:                  320px;                        \
            background:             #42464D;                      \
            border:                 1px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
        }                                                         \
      /* Divide Buttons */                                        \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      /* Buttons */                                               \
      button {                                                    \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              14px;                         \
            font-weight:            400;                          \
            padding:                4px;                          \
            cursor:                 pointer;                      \
            outline:                none;                         \
            border:                 none;                         \
            border-radius:          10px;                         \
        }                                                         \
      /* Reactscore & Posts */                                    \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* utoob & screens & DL */                                  \
      .field {                                                    \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      .field:focus {                                              \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* match all inputs to background*/                         \
      input{                                                      \
            background:             transparent;                  \
            color:                  white;                        \
      }                                                           \
      /* Start Rounded sliders Checkboxes */                      \
      .switch {                                                   \
            position:               relative;                     \
            display:                inline-block;                 \
            width:                  42px;                         \
            height:                 17px;                         \
      }                                                           \
      .switch input {                                             \
            opacity:                0;                            \
            width:                  0;                            \
            height:                 0;                            \
      }                                                           \
      .slider {                                                   \
            position:               absolute;                     \
            cursor:                 pointer;                      \
            top:                    0;                            \
            left:                   0;                            \
            right:                  0;                            \
            bottom:                 0;                            \
            background-color:       #ccc;                         \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      .slider:before {                                            \
            position:               absolute;                     \
            content:                '';                           \
            height:                 13px;                         \
            width:                  13px;                         \
            left:                   2px;                          \
            bottom:                 2px;                          \
            background-color:       #42464D;                      \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      input:checked + .slider {                                   \
            background-color:       #4caf50;                      \
      }                                                           \
      input:focus + .slider {                                     \
            box-shadow:             0 0 1px #4caf50;              \
      }                                                           \
      input:checked + .slider:before {                            \
            -webkit-transform:      translateX(26px);             \
            -ms-transform:          translateX(26px);             \
            transform:              translateX(26px);             \
      }                                                           \
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
      /* End Rounded sliders Checkboxes */                        \
      .close {                                                    \
            position:               absolute;                     \
            right:                  26px;                         \
            top:                    4px;                          \
            opacity:                0.5;                          \
      }                                                           \
      .close:hover {                                              \
            opacity:                1;                            \
      }                                                           \
      .close:before, .close:after {                               \
            position:               absolute;                     \
            left:                   15px;                         \
            content:                ' ';                          \
            height:                 15px;                         \
            width:                  2.5px;                        \
            background-color:       #4caf50;                      \
      }                                                           \
      .close:before {                                             \
            transform:              rotate(45deg);                \
      }                                                           \
      .close:after {                                              \
            transform:              rotate(-45deg);               \
      }                                                           \
}                                                                 \
    @media screen and (min-width: 768px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                2em;                          \
            width:                  350px;                        \
            background:             #42464D;                      \
            border:                 3px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
      }                                                           \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      button {                                                    \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              15px;                         \
            font-weight:            400;                          \
            padding:                6px;                          \
            cursor:                 pointer;                      \
            outline:                none;                         \
            border:                 none;                         \
            border-radius:          10px;                         \
        }                                                         \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      .field {                                                    \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
        &::placeholder {                                          \
            color: transparent;                                   \
     }                                                            \
      .field:focus {                                              \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      input{                                                      \
            background:             transparent;                  \
            color:                  white;                        \
      }                                                           \
      .switch {                                                   \
            position:               relative;                     \
            display:                inline-block;                 \
            width:                  42px;                         \
            height:                 17px;                         \
      }                                                           \
      .switch input {                                             \
            opacity:                0;                            \
            width:                  0;                            \
            height:                 0;                            \
      }                                                           \
      .slider {                                                   \
            position:               absolute;                     \
            cursor:                 pointer;                      \
            top:                    0;                            \
            left:                   0;                            \
            right:                  0;                            \
            bottom:                 0;                            \
            background-color:       #ccc;                         \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      .slider:before {                                            \
            position:               absolute;                     \
            content:                '';                           \
            height:                 13px;                         \
            width:                  13px;                         \
            left:                   2px;                          \
            bottom:                 2px;                          \
            background-color:       #42464D;                      \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      input:checked + .slider {                                   \
            background-color:       #4caf50;                      \
      }                                                           \
      input:focus + .slider {                                     \
            box-shadow:             0 0 1px #4caf50;              \
      }                                                           \
      input:checked + .slider:before {                            \
            -webkit-transform:      translateX(26px);             \
            -ms-transform:          translateX(26px);             \
            transform:              translateX(26px);             \
      }                                                           \
      /* Rounded sliders */                                       \
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
      .close {                                                    \
            position:               absolute;                     \
            right:                  30px;                         \
            top:                    6px;                          \
            opacity:                0.5;                          \
      }                                                           \
      .close:hover {                                              \
            opacity:                1;                            \
      }                                                           \
      .close:before, .close:after {                               \
            position:               absolute;                     \
            left:                   15px;                         \
            content:                ' ';                          \
            height:                 20px;                         \
            width:                  3.5px;                        \
            background-color:       #4caf50;                      \
      }                                                           \
      .close:before {                                             \
            transform:              rotate(45deg);                \
      }                                                           \
      .close:after {                                              \
            transform:              rotate(-45deg);               \
      }                                                           \
}                                                                 \
");
