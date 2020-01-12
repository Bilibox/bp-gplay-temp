// ==UserScript==
// @name        Blackpearl APK Scrapper
// @version     1.0.1
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
<button id="ShowTemplate" name="template_button" style="display:none" type="button">Show</button>
<div id="ApkGenerator">
<input type="text" id="gplaylink" value="" class="input" placeholder="Google Play Store Link">
<input type="text" id="modinfo" value="" class="input" placeholder="Mod Details">
<input type="text" id="virustotal" value="" class="input" placeholder="VirusTotal Link">
<input type="text" id="ddl" value="" class="input" placeholder="Download Link">
<div id="textarea_divider">&nbsp;</div>
<span>DownCloud</span>
<label class="switch">
<input type="checkbox" id="Downcloud" value="Downcloud" checked></input>
<span class="slider round"></span></label>
HideReactScore
<input type="number" id="HideReactScore" min="0" max="100" value="0">
HidePosts
<input type="number" id="HidePosts" min="0" max="50" value="0"> <br>
<div id="textarea_divider">&nbsp;</div>
<button id="Generate" name="template_button" type="button">Generate Template</button>
<button id="ClearBtn" name="template_button" type="reset">Clear</button>
<button id="HideTemplate" name="template_button" type="button">Hide</button>
</div>
`

var temphtml = document.getElementsByTagName("dd")[0];
temphtml.innerHTML += Generate_Template;


$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
        $("#OmdbGenerator").hide ();
        document.getElementById("gmShowTemplate").style.display = "block";
    }
});

$("#gmHideTemplate").click ( function () {
    document.getElementById("gmShowTemplate").style.display = "block";
    $("#OmdbGenerator").hide ();
});

$("#gmShowTemplate").click ( function () {
    document.getElementById("gmShowTemplate").style.display = "none";
    $("#OmdbGenerator").show ();
});

$("#Generate").click ( function () {
    var link = $("#gplaylink").val();
    var modinfo = $("#modinfo").val();
    var VT = $("#virustotal").val();
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
var SL = screens.length;
var Sc = "";
  for (var i=0; i<SL; i++) {
  Sc += '[IMG width="300px"]'+screens[i]+'[/IMG]';
  }
var discription = parsedHtml.getElementsByClassName("DWPxHb")[0].textContent;
var rating = parsedHtml.getElementsByClassName("BHMmbe")[0].innerText;
var reviewscount = parsedHtml.getElementsByClassName("O3QoBc hzfjkd")[0].nextSibling.innerHTML;
var size = parsedHtml.getElementsByClassName("htlgb")[3].textContent;
var requiredAndroid = parsedHtml.getElementsByClassName("htlgb")[9].textContent;
var ContentRating = parsedHtml.getElementsByClassName("htlgb")[11].innerText.split("\n")[0];
var LatestPlayStoreVersion = parsedHtml.getElementsByClassName("htlgb")[7].textContent;
var dump = `[CENTER][IMG width="100px"]${logo}[/IMG]
[COLOR=rgb(26, 162, 96)][B][SIZE=6] ${title}[/SIZE][/B][/COLOR]
[IMG width="30px"]https://i.postimg.cc/g28wfSTs/630px-Green-star-41-108-41-svg.png[/IMG][SIZE=6][B]${rating}[/B]/5
[IMG width="40px"]https://i.postimg.cc/kg6NDvhR/person-male.png[/IMG]${reviewscount}[/SIZE]
[/CENTER]
[INDENT][SIZE=6][COLOR=rgb(26, 162, 96)][B]Screenshots[/B][/COLOR][/SIZE][/INDENT]
[CENTER]${Sc}[/CENTER]

[hr][/hr]
[INDENT][SIZE=6][COLOR=rgb(26, 162, 96)][B]App Description[/B][/COLOR][/SIZE][/INDENT]
[SPOILER='App Description']
${discription}
[/SPOILER]
[hr][/hr]
[INDENT][SIZE=6][COLOR=rgb(26, 162, 96)][B]App Details[/B][/COLOR][/SIZE][/INDENT]

[LIST]
[*][B]Developer: [/B] ${dev}
[*][B]Category: [/B] ${category}
[*][B]Content Rating: [/B] ${ContentRating}
[*][B]Required Android Version: [/B] ${requiredAndroid}
[*][B]Size: [/B] ${size}
[*][B]Latest Google Play Version: [/B] ${LatestPlayStoreVersion}
[URL=${link}][IMG width="250px"]https://i.postimg.cc/mrWtVGwr/image.png[/IMG][/URL]
[/LIST]
[hr][/hr]
[INDENT][SIZE=6][COLOR=rgb(26, 162, 96)][B]Mod Info[/B][/COLOR][/SIZE][/INDENT]
${modinfo}
[hr][/hr]
[INDENT][SIZE=6][COLOR=rgb(26, 162, 96)][B]Virustotal[/B][/COLOR][/SIZE][/INDENT]
[DOWNCLOUD]${VT}[/DOWNCLOUD]
[hr][/hr]
[INDENT][SIZE=6][COLOR=rgb(26, 162, 96)][B]Download Link[/B][/COLOR][/SIZE][/INDENT]
[CENTER][HIDEPOSTS=1][HIDEREACTSCORE=10][HIDEREACT=1,2,3,4,5,6]
[DOWNCLOUD]drive.google.com[/DOWNCLOUD]
[/HIDEREACT][/HIDEREACTSCORE][/HIDEPOSTS]
[/CENTER]`
  GM_setClipboard (dump);
                        try {
                            document.getElementsByName("message")[0].value = dump;
                        } catch(err) {
                            alert('You should be running this in BBCode Mode. Check the Readme for more information!\n' + err);
                        } finally {
                            var xf_title_value = document.getElementById("title").value;
                            if (!xf_title_value){
                                document.getElementById("title").value = title;
                            }
                        }
}});
});

//--- CSS styles make it work...
GM_addStyle ( "                                                   \
    @media screen and (min-width: 300px) {                        \
      /* Divide Buttons */                                        \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      /* Buttons */                                               \
      button[name=template_button] {                              \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              14px;                         \
            font-weight:            600;                          \
            padding:                4px;                          \
            cursor:                 pointer;                      \
            outline:                none;                         \
            margin-right:           8px;                          \
            border:                 none;                         \
            border-radius:          3px;                          \
            border-color:           #67bd6a;                      \
            margin-top:             5px;                          \
            box-shadow:             0 0 2px 0 rgba(0,0,0,0.14),   \
                                    0 2px 2px 0 rgba(0,0,0,0.12), \
                                    0 1px 3px 0 rgba(0,0,0,0.2);  \
        }                                                         \
      /* Reactscore & Posts */                                    \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
            background:             transparent;                  \
            color:                  white;                        \
            max-width:              35px;                         \
      }                                                           \
      #textarea_divider {                                         \
            margin-top:             -11px;                        \
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
}                                                                 \
    @media screen and (min-width: 768px) {                        \
      /* Divide Buttons */                                        \
      .divider{                                                   \
            width:                  15px;                         \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      /* Buttons */                                               \
      button[name=template_button] {                              \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              15px;                         \
            font-weight:            600;                          \
            padding:                6px;                          \
            cursor:                 pointer;                      \
            outline:                none;                         \
            margin-right:           8px;                          \
            border:                 none;                         \
            border-radius:          3px;                          \
            border-color:           #67bd6a;                      \
            margin-top:             5px;                          \
            box-shadow:             0 0 2px 0 rgba(0,0,0,0.14),   \
                                    0 2px 2px 0 rgba(0,0,0,0.12), \
                                    0 1px 3px 0 rgba(0,0,0,0.2);  \
        }                                                         \
      /* Reactscore & Posts */                                    \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
            background:             transparent;                  \
            color:                  white;                        \
            max-width:              35px;                         \
      }                                                           \
      #textarea_divider {                                         \
            margin-top:             -11px;                        \
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
}                                                                 \
");
