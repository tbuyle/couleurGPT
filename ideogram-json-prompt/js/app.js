"use strict";
/* ---------------- i18n ---------------- */
const LANG=((new URLSearchParams(location.search).get("lang")||"fr").toLowerCase()==="en")?"en":"fr";
const I18N={
  fr:{
    docTitle:"Ideogram JSON Builder",
    brand_pre:"constructeur de ",brand_link:"prompt structuré pour Ideogram 4",
    tpl_label:"Modèle",tpl_blank:"Vierge",tpl_poster:"Affiche",tpl_card:"Carte à collectionner",tpl_sticker:"Sticker",tpl_thumb:"Miniature YouTube",
    btn_import:"Importer",btn_download:"Télécharger",btn_copy:"Copier le JSON",
    sec_format:"Format de l'image",sec_desc:"Description générale",
    opt_recommended:"· recommandé",
    ph_hld:"Résumé de l'image en une phrase…",
    tip_hld:"Résumé de l'image en une phrase. Donne le cadre général dans lequel tout le reste s'inscrit. Optionnel mais vivement conseillé.",
    sec_style:"Style",style_mode_label:"Type de rendu",
    tip_style_mode:"Choisissez « photo » pour un rendu photographique, ou « art_style » pour de l'illustration, peinture ou design. Les deux ne peuvent jamais coexister ; « aucun » laisse Ideogram décider.",
    seg_none:"aucun",
    tip_aesthetics:"L'ambiance et le style visuel global, en adjectifs : minimaliste, vibrant, vintage, cinématographique…",
    ph_aesthetics:"moderniste, épuré, contraste élevé…",
    tip_lighting:"La lumière de la scène : type, direction et couleur. Ex. : lumière de studio douce, contre-jour, néons colorés, clair de lune.",
    ph_lighting:"lumière douce, contre-jour, néons…",
    tip_medium:"Le support ou la technique de l'image : photograph, illustration, painting, graphic_design, 3d_render…",
    ph_medium:"photograph, illustration, painting…",
    opt_photo:"· objectif, ouverture…",
    tip_photo:"Réglages de prise de vue qui imitent un vrai appareil : focale, ouverture, profondeur de champ. Ex. : 85mm, f/1.8, faible profondeur de champ.",
    ph_photo:"85mm, f/1.8, faible profondeur de champ…",
    tip_art:"Le style artistique précis du rendu non-photo : aquarelle, illustration vectorielle plate, concept art, gravure rehaussée…",
    ph_art:"aquarelle, vectoriel plat, concept art…",
    opt_max16:"· max 16",
    tip_palette_img:"Couleurs imposées à l'ensemble de l'image, au format hexadécimal #RRGGBB. Jusqu'à 16 teintes.",
    sec_comp:"Composition",
    opt_bg:"· le décor, pas les sujets",ph_bg:"Décrivez l'arrière-plan / l'ambiance…",
    tip_bg:"Le décor et l'ambiance de fond uniquement. Les sujets (personnages, objets, textes) vont dans les éléments, pas ici.",
    opt_elements:"· objets et textes",
    tip_elements:"Les sujets de l'image, ajoutés un par un : « obj » pour un objet (décrit librement), « text » pour un texte rendu à la lettre près.",
    btn_add_text:"+ Texte",btn_add_obj:"+ Objet",
    canvas_title:"Éditeur de zones (bbox)",json_title:"Sortie JSON",btn_copy_short:"Copier",checks_title:"Vérifications",
    import_title:"Importer un JSON",ph_import:"Collez ici un prompt JSON Ideogram…",btn_cancel:"Annuler",btn_load:"Charger",
    footer_pre:"Créé avec ❤️ (et l'aide de Claude) pour ",select_language:"select language",
    more_ratios_title:"Plus de formats",col_landscape:"Paysage",col_portrait:"Portrait",
    el_text_empty:"(texte vide)",el_obj:"(objet)",el_text_field:"text (rendu à la lettre)",el_palette_opt:"· max 5",
    el_no_bbox:"pas de bbox — dessinez la zone sur le canvas →",el_target:"cibler",el_clear:"effacer",
    add_color_title:"Ajouter une couleur",color_edit_suffix:" · cliquer pour modifier",
    hint_select:"Sélectionnez un élément (liste de gauche) pour placer sa zone.",
    hint_draw:"Dessinez la zone de l'élément sélectionné.",
    hint_move:"Glissez pour déplacer · poignées pour redimensionner.",
    toast_copied:"JSON copié ✓",toast_copy_blocked:"Copie bloquée dans cet aperçu — ouvrez le fichier directement",
    toast_dl_blocked:"Téléchargement bloqué ici — JSON copié ✓",toast_dl_unavail:"Téléchargement indisponible dans cet aperçu",
    toast_imported:"Importé ✓",toast_json_invalid:"JSON invalide",
    v_aesthetics:"aesthetics est requis quand un style est défini",v_lighting:"lighting est requis",v_medium:"medium est requis",
    v_pal_img:"palette image : 16 couleurs max",v_bg:"background est vide (recommandé)",
    v_no_el:"aucun élément : ajoutez au moins un objet ou un texte",v_elem:"élément ",
    v_text_empty:" (texte) : le champ text est vide",v_desc_empty:" : desc est vide",v_pal_el:" : 5 couleurs max par élément",
    v_bbox_inv:" : bbox inversé (max ≤ min)",v_bbox_range:" : bbox hors de 0–1000",v_ok:"Tout est cohérent — prêt à copier."
  },
  en:{
    docTitle:"Ideogram JSON Builder",
    brand_pre:"a builder for ",brand_link:"structured prompts for Ideogram 4",
    tpl_label:"Template",tpl_blank:"Blank",tpl_poster:"Poster",tpl_card:"Trading card",tpl_sticker:"Sticker",tpl_thumb:"YouTube thumbnail",
    btn_import:"Import",btn_download:"Download",btn_copy:"Copy JSON",
    sec_format:"Image format",sec_desc:"General description",
    opt_recommended:"· recommended",
    ph_hld:"One-sentence summary of the image…",
    tip_hld:"A one-sentence summary of the image. Sets the overall frame everything else fits into. Optional but strongly recommended.",
    sec_style:"Style",style_mode_label:"Render type",
    tip_style_mode:"Choose “photo” for a photographic render, or “art_style” for illustration, painting or design. The two can never coexist; “none” lets Ideogram decide.",
    seg_none:"none",
    tip_aesthetics:"The overall mood and visual style, as adjectives: minimalist, vibrant, vintage, cinematic…",
    ph_aesthetics:"modernist, clean, high contrast…",
    tip_lighting:"The lighting of the scene: type, direction and color. E.g. soft studio light, backlight, colorful neon, moonlight.",
    ph_lighting:"soft light, backlight, neon…",
    tip_medium:"The medium or technique of the image: photograph, illustration, painting, graphic_design, 3d_render…",
    ph_medium:"photograph, illustration, painting…",
    opt_photo:"· lens, aperture…",
    tip_photo:"Camera settings that mimic a real device: focal length, aperture, depth of field. E.g. 85mm, f/1.8, shallow depth of field.",
    ph_photo:"85mm, f/1.8, shallow depth of field…",
    tip_art:"The precise artistic style of a non-photo render: watercolor, flat vector illustration, concept art, enhanced engraving…",
    ph_art:"hand-painted watercolor, flat vector illustration, digital painting…",
    opt_max16:"· max 16",
    tip_palette_img:"Colors enforced across the whole image, in #RRGGBB hex format. Up to 16.",
    sec_comp:"Composition",
    opt_bg:"· the setting, not the subjects",ph_bg:"Describe the background / atmosphere…",
    tip_bg:"The background setting and atmosphere only. Subjects (characters, objects, text) go in the elements, not here.",
    opt_elements:"· objects and text",
    tip_elements:"The image's subjects, added one by one: “obj” for an object (freely described), “text” for text rendered literally.",
    btn_add_text:"+ Text",btn_add_obj:"+ Object",
    canvas_title:"Region editor (bbox)",json_title:"JSON output",btn_copy_short:"Copy",checks_title:"Checks",
    import_title:"Import JSON",ph_import:"Paste an Ideogram JSON prompt here…",btn_cancel:"Cancel",btn_load:"Load",
    footer_pre:"Built with ❤️ (and Claude's help) for ",select_language:"select language",
    more_ratios_title:"More formats",col_landscape:"Landscape",col_portrait:"Portrait",
    el_text_empty:"(empty text)",el_obj:"(object)",el_text_field:"text (rendered literally)",el_palette_opt:"· max 5",
    el_no_bbox:"no bbox — draw the region on the canvas →",el_target:"target",el_clear:"clear",
    add_color_title:"Add a color",color_edit_suffix:" · click to edit",
    hint_select:"Select an element (left list) to place its region.",
    hint_draw:"Draw the selected element's region.",
    hint_move:"Drag to move · handles to resize.",
    toast_copied:"JSON copied ✓",toast_copy_blocked:"Copy blocked in this preview — open the file directly",
    toast_dl_blocked:"Download blocked here — JSON copied ✓",toast_dl_unavail:"Download unavailable in this preview",
    toast_imported:"Imported ✓",toast_json_invalid:"Invalid JSON",
    v_aesthetics:"aesthetics is required when a style is set",v_lighting:"lighting is required",v_medium:"medium is required",
    v_pal_img:"image palette: 16 colors max",v_bg:"background is empty (recommended)",
    v_no_el:"no elements: add at least one object or text",v_elem:"element ",
    v_text_empty:" (text): the text field is empty",v_desc_empty:": desc is empty",v_pal_el:": 5 colors max per element",
    v_bbox_inv:": inverted bbox (max ≤ min)",v_bbox_range:": bbox out of 0–1000",v_ok:"All consistent — ready to copy."
  }
};
function t(k){const d=I18N[LANG]||I18N.fr;return (d[k]!=null)?d[k]:(I18N.fr[k]!=null?I18N.fr[k]:k);}
function applyI18n(){
  document.documentElement.lang=LANG;
  document.title=t("docTitle");
  document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=t(el.getAttribute("data-i18n"));});
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{el.setAttribute("placeholder",t(el.getAttribute("data-i18n-ph")));});
  document.querySelectorAll("[data-i18n-tip]").forEach(el=>{el.setAttribute("data-tip",t(el.getAttribute("data-i18n-tip")));});
  document.querySelectorAll(".flag").forEach(f=>f.classList.toggle("on",f.dataset.lang===LANG));
}

/* ---------------- presets ---------------- */
const PRESETS_I18N={
  fr:{
    aesthetics:["minimaliste","cinématographique","éditorial","steampunk","cyberpunk","fantasy épique","vibrant","premium"],
    lighting:["lumière de studio douce","contre-jour","néons colorés","clair de lune","lumière naturelle diffuse","éclairage plat uniforme"],
    medium:["photograph","illustration","painting","graphic_design","3d_render"],
    art_style:["aquarelle peinte à la main","illustration vectorielle plate","peinture numérique","concept art","gravure rehaussée","lettrage manuscrit"]
  },
  en:{
    aesthetics:["minimalist","cinematic","editorial","steampunk","cyberpunk","epic fantasy","vibrant","premium"],
    lighting:["soft studio light","backlight","colorful neon","moonlight","soft natural light","flat even lighting"],
    medium:["photograph","illustration","painting","graphic_design","3d_render"],
    art_style:["hand-painted watercolor","flat vector illustration","digital painting","concept art","enhanced engraving","hand lettering"]
  }
};
const PRESETS=PRESETS_I18N[LANG]||PRESETS_I18N.fr;
const QUICK=["1:1","2:3","3:2","16:9","9:16","4:5"];
const ALL=["1:1","16:9","16:10","3:2","4:3","5:4","2:1","3:1","9:16","10:16","2:3","3:4","4:5","1:2","1:3"];
function parseRatio(label){const p=String(label).split(":");const w=parseFloat(p[0])||1,h=parseFloat(p[1])||1;return[w,h];}

/* ---------------- state ---------------- */
let uid=1; const nid=()=>"e"+(uid++);
function newEl(type){return{id:nid(),type:type||"obj",text:"",desc:"",bbox:null,color_palette:[],open:true};}
function blankState(){return{
  ratio:"2:3",high_level_description:"",
  style:{mode:"art_style",aesthetics:"",lighting:"",medium:"",photo:"",art_style:"",color_palette:[]},
  background:"",elements:[]
};}
let state=blankState();
let selId=null;

/* ---------------- templates (localized) ---------------- */
const TPLD={
  poster:{ratio:"2:3",mode:"art_style",medium:"graphic_design",cp:["#0E1B2A","#E8412C","#F4E2B9"],
    fr:{hld:"Affiche de festival de jazz minimaliste avec une silhouette de trompettiste.",aesthetics:"moderniste, grille suisse, sobre",lighting:"éclairage frontal plat",art_style:"aplats de couleur, lettrage sans-serif gras",bg:"Fond bleu nuit uni, léger grain d'impression.",
      els:[{type:"text",text:"JAZZ EN VILLE",desc:"Titre en grandes capitales crème, en haut.",bbox:[60,100,170,900],cp:["#F4E2B9"]},
           {type:"obj",desc:"Silhouette orange d'un trompettiste de profil, au centre.",bbox:[180,250,720,750]},
           {type:"text",text:"BRUXELLES · 12-15 JUILLET",desc:"Dates en petites capitales orange, en bas.",bbox:[850,250,920,750]}]},
    en:{hld:"Minimalist jazz festival poster with a trumpet player silhouette.",aesthetics:"modernist, swiss grid, restrained",lighting:"flat frontal lighting",art_style:"flat color fields, bold sans-serif lettering",bg:"Solid midnight-blue background, light print grain.",
      els:[{type:"text",text:"JAZZ IN TOWN",desc:"Title in large cream capitals, at the top.",bbox:[60,100,170,900],cp:["#F4E2B9"]},
           {type:"obj",desc:"Orange silhouette of a trumpet player in profile, centered.",bbox:[180,250,720,750]},
           {type:"text",text:"BRUSSELS · JULY 12-15",desc:"Dates in small orange capitals, at the bottom.",bbox:[895,790,970,920]}]}},
  card:{ratio:"2:3",mode:"art_style",medium:"painting",cp:["#0E2433","#2B6C8F","#C9A24B"],
    fr:{hld:"Carte à collectionner fantasy représentant un dragon de givre.",aesthetics:"fantasy, jeu de cartes, ornemental",lighting:"lumière froide et magique",art_style:"peinture numérique fantasy détaillée, cadre orné",bg:"Bordure ornementale dorée sur fond bleu glacé.",
      els:[{type:"text",text:"DRAGON DE GIVRE",desc:"Nom en bandeau supérieur, capitales dorées.",bbox:[40,80,130,920],cp:["#C9A24B"]},
           {type:"obj",desc:"Dragon de givre déployant ses ailes sur un pic enneigé, dans un cadre.",bbox:[150,110,620,890]},
           {type:"text",text:"8 / 8",desc:"Statistiques en gros chiffres dorés, coin inférieur droit.",bbox:[895,790,970,920],cp:["#C9A24B"]}]},
    en:{hld:"Fantasy trading card depicting a frost dragon.",aesthetics:"fantasy, card game, ornamental",lighting:"cold magical light",art_style:"detailed fantasy digital painting, ornate frame",bg:"Ornate golden border on an icy blue background.",
      els:[{type:"text",text:"FROST DRAGON",desc:"Name in a top banner, golden capitals.",bbox:[40,80,130,920],cp:["#C9A24B"]},
           {type:"obj",desc:"Frost dragon spreading its wings on a snowy peak, in a frame.",bbox:[150,110,620,890]},
           {type:"text",text:"8 / 8",desc:"Stats in large golden digits, bottom-right corner.",bbox:[895,790,970,920],cp:["#C9A24B"]}]}}},
  sticker:{ratio:"1:1",mode:"art_style",medium:"graphic_design",cp:["#FF8C42","#FFF3E0","#6BBF59"],
    fr:{hld:"Sticker illustré d'une tasse de café souriante avec le mot FRESH.",aesthetics:"mignon, ludique, propre",lighting:"éclairage plat et uniforme",art_style:"illustration vectorielle plate, contours épais, liseré blanc",bg:"Fond uni beige clair, sans décor.",
      els:[{type:"obj",desc:"Tasse de café kawaii souriante avec vapeur stylisée.",bbox:[300,300,820,700]},
           {type:"text",text:"FRESH",desc:"Lettrage gras arrondi orange, en arc au-dessus de la tasse.",bbox:[90,250,260,750]}]},
    en:{hld:"Illustrated sticker of a smiling coffee cup with the word FRESH.",aesthetics:"cute, playful, clean",lighting:"flat even lighting",art_style:"flat vector illustration, thick outlines, white sticker border",bg:"Plain light beige background, no scenery.",
      els:[{type:"obj",desc:"Kawaii smiling to-go coffee cup with stylized steam.",bbox:[300,300,820,700]},
           {type:"text",text:"FRESH",desc:"Bold rounded orange lettering, arched above the cup.",bbox:[90,250,260,750]}]}},
  thumb:{ratio:"16:9",mode:"art_style",medium:"graphic_design",cp:["#0B1020","#12D8FA","#FFD23F","#F5F7FA"],
    fr:{hld:"Miniature YouTube percutante sur le prompting JSON d'Ideogram, fond sombre dynamique et titre en gros caractères.",aesthetics:"miniature YouTube, percutant, contraste élevé, accrocheur",lighting:"lueurs néon, halo central, forte luminosité",art_style:"design graphique audacieux, gros lettrage, formes dynamiques, accolades de code stylisées",bg:"Fond bleu nuit en dégradé avec des accolades { } translucides et des éclats lumineux, espace central dégagé pour le titre.",
      els:[{type:"text",text:"GUIDE",desc:"Petit badge en capitales grasses sur pastille jaune, en haut à gauche.",bbox:[70,60,165,300],cp:["#FFD23F"]},
           {type:"text",text:"Ideogram JSON Prompt",desc:"Titre principal en très grandes capitales grasses blanches, sur deux ou trois lignes, occupant la moitié gauche, avec une légère lueur.",bbox:[210,60,760,650],cp:["#F5F7FA"]},
           {type:"obj",desc:"Panneau de code JSON stylisé avec des accolades lumineuses cyan, sur la droite de l'image.",bbox:[170,690,830,945]}]},
    en:{hld:"Punchy YouTube thumbnail about Ideogram JSON prompting, dynamic dark background with a big title.",aesthetics:"YouTube thumbnail, punchy, high contrast, eye-catching",lighting:"neon glow, central halo, high brightness",art_style:"bold graphic design, large lettering, dynamic shapes, stylized code braces",bg:"Gradient midnight-blue background with translucent { } braces and light bursts, clear central space for the title.",
      els:[{type:"text",text:"GUIDE",desc:"Small bold badge on a yellow pill, top-left.",bbox:[70,60,165,300],cp:["#FFD23F"]},
           {type:"text",text:"Ideogram JSON Prompt",desc:"Main title in very large bold white capitals, on two or three lines, occupying the left half, with a slight glow.",bbox:[210,60,760,650],cp:["#F5F7FA"]},
           {type:"obj",desc:"Stylized JSON code panel with glowing cyan braces, on the right side of the image.",bbox:[170,690,830,945]}]}}
};
function tpl(name){
  const d=TPLD[name];if(!d)return blankState();
  const c=d[LANG]||d.fr;
  const s=blankState();s.ratio=d.ratio;
  s.style={mode:d.mode,aesthetics:c.aesthetics||"",lighting:c.lighting||"",medium:c.medium||"",photo:c.photo||"",art_style:c.art_style||"",color_palette:(d.cp||[]).slice()};
  s.high_level_description=c.hld||"";s.background=c.bg||"";
  s.elements=(c.els||[]).map(e=>Object.assign(newEl(e.type),{text:e.text||"",desc:e.desc||"",bbox:e.bbox?e.bbox.slice():null,color_palette:(e.cp||[]).slice(),open:true}));
  return s;
}

/* ---------------- helpers ---------------- */
const $=s=>document.querySelector(s);
function ratioWH(){return parseRatio(state.ratio);}
const H_INT=600;
function intW(){const[w,h]=ratioWH();return Math.round(H_INT*w/h);}
function normHex(h){if(!h)return null;h=h.trim();let m;
  if(/^#?[0-9a-fA-F]{6}$/.test(h))return("#"+h.replace("#","")).toUpperCase();
  if((m=/^#?([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(h)))return("#"+m[1]+m[1]+m[2]+m[2]+m[3]+m[3]).toUpperCase();
  return null;
}
function toast(msg){const e=$("#toast");e.textContent=msg;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),1600);}

/* ---------------- build prompt object (key order!) ---------------- */
function buildPrompt(){
  const o={};
  if(state.high_level_description.trim())o.high_level_description=state.high_level_description.trim();
  if(state.style.mode!=="none"){
    const st={};
    st.aesthetics=state.style.aesthetics;
    st.lighting=state.style.lighting;
    if(state.style.mode==="photo"){st.photo=state.style.photo;st.medium=state.style.medium;}
    else{st.medium=state.style.medium;st.art_style=state.style.art_style;}
    if(state.style.color_palette.length)st.color_palette=state.style.color_palette;
    o.style_description=st;
  }
  const cd={background:state.background};
  cd.elements=state.elements.map(e=>{
    const el={type:e.type};
    if(e.bbox)el.bbox=e.bbox;
    if(e.type==="text")el.text=e.text;
    el.desc=e.desc;
    if(e.color_palette.length)el.color_palette=e.color_palette;
    return el;
  });
  o.compositional_deconstruction=cd;
  return o;
}
function syntaxHL(json){
  return json.replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/"(\\.|[^"\\])*"(\s*:)?/g,(m)=>m.endsWith(":")||/:\s*$/.test(m)?'<span class="k">'+m+'</span>':'<span class="s">'+m+'</span>')
    .replace(/\b(-?\d+\.?\d*)\b/g,'<span class="n">$1</span>')
    .replace(/([{}\[\],])/g,'<span class="p">$1</span>');
}

/* ---------------- validation ---------------- */
function validate(){
  const v=[];const s=state;
  if(s.style.mode!=="none"){
    if(!s.style.aesthetics.trim())v.push(["err",t("v_aesthetics")]);
    if(!s.style.lighting.trim())v.push(["err",t("v_lighting")]);
    if(!s.style.medium.trim())v.push(["err",t("v_medium")]);
    if(s.style.color_palette.length>16)v.push(["err",t("v_pal_img")]);
  }
  if(!s.background.trim())v.push(["warn",t("v_bg")]);
  if(!s.elements.length)v.push(["warn",t("v_no_el")]);
  s.elements.forEach((e,i)=>{
    const nm=t("v_elem")+(i+1);
    if(e.type==="text"&&!e.text.trim())v.push(["err",nm+t("v_text_empty")]);
    if(!e.desc.trim())v.push(["warn",nm+t("v_desc_empty")]);
    if(e.color_palette.length>5)v.push(["err",nm+t("v_pal_el")]);
    if(e.bbox){const[a,b,c,d]=e.bbox;
      if(c<=a||d<=b)v.push(["err",nm+t("v_bbox_inv")]);
      if([a,b,c,d].some(x=>x<0||x>1000))v.push(["err",nm+t("v_bbox_range")]);}
  });
  if(!v.length)v.push(["ok",t("v_ok")]);
  return v;
}

/* ---------------- ratios ---------------- */
function buildRatios(){
  const c=$("#ratios");c.innerHTML="";
  const list=QUICK.slice();if(!list.includes(state.ratio))list.push(state.ratio);
  list.forEach(r=>{const b=document.createElement("button");b.textContent=r;
    b.className=state.ratio===r?"on":"";b.onclick=()=>setRatio(r);c.appendChild(b);});
  const more=document.createElement("button");more.id="moreRatios";more.className="ratioBtnMore";more.textContent="＋";
  more.title=t("more_ratios_title");
  more.onclick=e=>{e.stopPropagation();buildRatioPop();$("#ratioPop").classList.toggle("on");};
  c.appendChild(more);
}
function setRatio(r){state.ratio=r;$("#ratioPop").classList.remove("on");buildRatios();drawBoard();persist();}
function ratioPrev(label,maxd){const[w,h]=parseRatio(label);let pw,ph;
  if(w>=h){pw=maxd;ph=Math.max(4,Math.round(maxd*h/w));}else{ph=maxd;pw=Math.max(4,Math.round(maxd*w/h));}
  return '<span class="rPrev" style="width:'+pw+'px;height:'+ph+'px"></span>';
}
function rItem(label){const on=state.ratio===label?" on":"";return '<button class="rItem'+on+'" data-r="'+label+'">'+ratioPrev(label,20)+'<span>'+label+'</span></button>';} 
function buildRatioPop(){
  const pop=$("#ratioPop");
  const PAIRS=[["16:9","9:16"],["16:10","10:16"],["3:2","2:3"],["4:3","3:4"],["5:4","4:5"],["2:1","1:2"],["3:1","1:3"]];
  const rows=PAIRS.map(p=>rItem(p[0])+rItem(p[1])).join("");
  pop.innerHTML='<div class="top">'+rItem("1:1")+'</div>'+
    '<div class="grp"><div class="coltitle">'+t("col_landscape")+'</div><div class="coltitle">'+t("col_portrait")+'</div>'+rows+'</div>';
  pop.querySelectorAll(".rItem").forEach(b=>b.onclick=e=>{e.stopPropagation();setRatio(b.dataset.r);});
}

/* ---------------- chips / fields ---------------- */
function buildChips(){
  document.querySelectorAll(".chips").forEach(box=>{
    const key=box.dataset.for;box.innerHTML="";
    (PRESETS[key]||[]).forEach(p=>{const c=document.createElement("span");c.className="chip";c.textContent=p;
      c.onclick=()=>{const inp=$("#"+key);const cur=inp.value.trim();
        inp.value=cur?(cur.replace(/,\s*$/,"" )+", "+p):p;inp.dispatchEvent(new Event("input"));};
      box.appendChild(c);
    });
  });
}
function bindField(id,setter){const el=$("#"+id);el.addEventListener("input",()=>{setter(el.value);updateOutputs();persist();});}
function renderPalette(container,arr,max,onChange){
  container.innerHTML="";
  arr.forEach((c,i)=>{
    const sw=document.createElement("div");sw.className="sw";sw.style.background=c;sw.title=c+t("color_edit_suffix");
    const ci=document.createElement("input");ci.type="color";ci.value=normHex(c)||"#000000";
    ci.addEventListener("input",()=>{const v=normHex(ci.value)||ci.value;arr[i]=v;sw.style.background=v;sw.title=v+t("color_edit_suffix");updateOutputs();});
    ci.addEventListener("change",()=>{persist();});
    const x=document.createElement("span");x.className="x";x.textContent="×";
    x.onclick=e=>{e.stopPropagation();arr.splice(i,1);onChange();};
    sw.appendChild(ci);sw.appendChild(x);container.appendChild(sw);
  });
  if(arr.length<max){
    const add=document.createElement("button");add.className="sw addtile";add.textContent="+";add.title=t("add_color_title");
    add.onclick=()=>{arr.push("#888888");onChange();
      const ins=container.querySelectorAll(".sw input[type=color]");const last=ins[ins.length-1];
      if(last){try{last.click();}catch(e){}}
    };
    container.appendChild(add);
  }
}
function syncStyleFields(){
  $("#styleMode").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.m===state.style.mode));
  const none=state.style.mode==="none";
  $("#styleFields").style.opacity=none?".4":"1";
  $("#styleFields").style.pointerEvents=none?"none":"auto";
  $("#photoField").style.display=state.style.mode==="photo"?"block":"none";
  $("#artField").style.display=state.style.mode==="art_style"?"block":"none";
}
function rerenderImgPalette(){renderPalette($("#imgPalette"),state.style.color_palette,16,()=>{rerenderImgPalette();updateOutputs();persist();});}
function fillFormValues(){
  $("#hld").value=state.high_level_description;
  $("#aesthetics").value=state.style.aesthetics;$("#lighting").value=state.style.lighting;
  $("#medium").value=state.style.medium;$("#photo").value=state.style.photo;$("#art_style").value=state.style.art_style;
  $("#background").value=state.background;
  rerenderImgPalette();
  syncStyleFields();
  buildRatios();
}

/* ---------------- elements list ---------------- */
function elemLabel(e){return e.type==="text"?(e.text||t("el_text_empty")):(e.desc||t("el_obj"));}
function renderElements(){
  const box=$("#elements");box.innerHTML="";
  state.elements.forEach((e,i)=>{
    const card=document.createElement("div");
    card.className="el"+(e.open?" open":"")+(e.id===selId?" sel":"");
    const hd=document.createElement("div");hd.className="hd";
    hd.innerHTML='<span class="tag '+e.type+'">'+e.type+'</span><span class="nm">'+escapeHtml(elemLabel(e))+'</span>';
    const up=mini("↑",()=>move(i,-1)),dn=mini("↓",()=>move(i,1)),
          tg=mini(e.open?"▾":"▸",()=>{e.open=!e.open;renderElements();}),
          del=mini("✕",()=>{state.elements.splice(i,1);if(selId===e.id)selId=null;renderElements();updateOutputs();persist();});
    hd.onclick=ev=>{if(ev.target.classList.contains("mini"))return;selId=e.id;renderElements();drawBoard();};
    [up,dn,tg,del].forEach(b=>hd.appendChild(b));
    card.appendChild(hd);
    const bd=document.createElement("div");bd.className="bd";
    if(e.type==="text"){bd.appendChild(fieldEl(t("el_text_field"),e.text,v=>{e.text=v;},true));}
    bd.appendChild(fieldEl("desc",e.desc,v=>{e.desc=v;}));
    const pal=document.createElement("div");pal.className="field";
    pal.innerHTML='<label>color_palette <span class="opt">'+t("el_palette_opt")+'</span></label>';
    const pc=document.createElement("div");pc.className="palette";pal.appendChild(pc);
    const rp=()=>renderPalette(pc,e.color_palette,5,()=>{rp();updateOutputs();persist();});rp();
    bd.appendChild(pal);
    const br=document.createElement("div");br.className="bboxrow";
    if(e.bbox)br.innerHTML='bbox <code>['+e.bbox.join(", ")+']</code>';
    else br.innerHTML='<span style="color:var(--dim)">'+t("el_no_bbox")+'</span>';
    const sb=mini("",()=>{selId=e.id;renderElements();drawBoard();document.querySelector(".stage").scrollIntoView({behavior:"smooth",block:"nearest"});});
    sb.textContent=t("el_target");sb.style.color="var(--teal)";sb.style.border="1px solid var(--teal-dim)";sb.style.borderRadius="5px";sb.style.fontSize="11px";
    br.appendChild(sb);
    if(e.bbox){const cb=mini(t("el_clear"),()=>{e.bbox=null;renderElements();drawBoard();updateOutputs();persist();});cb.style.fontSize="11px";cb.style.color="var(--dim)";br.appendChild(cb);}
    bd.appendChild(br);
    card.appendChild(bd);
    box.appendChild(card);
  });
}
function mini(label,fn){const b=document.createElement("button");b.className="mini";b.textContent=label;b.onclick=e=>{e.stopPropagation();fn();};return b;}
function fieldEl(label,val,setter,mono){
  const f=document.createElement("div");f.className="field";
  f.innerHTML='<label>'+escapeHtml(label)+'</label>';
  const ta=document.createElement("textarea");ta.value=val;if(mono){ta.style.fontFamily="var(--mono)";ta.style.minHeight="40px";}
  ta.addEventListener("input",()=>{setter(ta.value);
    updateOutputs();drawBoard();persist();
    const idx=[...$("#elements").children].indexOf(ta.closest(".el"));
    if(idx>-1){ta.closest(".el").querySelector(".nm").textContent=elemLabel(state.elements[idx]);}
  });
  f.appendChild(ta);return f;
}
function move(i,d){const j=i+d;if(j<0||j>=state.elements.length)return;
  const[el]=state.elements.splice(i,1);state.elements.splice(j,0,el);renderElements();drawBoard();updateOutputs();persist();}
function escapeHtml(s){return(s||"").replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));}

/* ---------------- canvas / bbox editor ---------------- */
const board=$("#board");
function px(nx,ny){return[nx/1000*intW(),ny/1000*H_INT];}
const clamp=v=>Math.max(0,Math.min(1000,v));
function evtPt(ev){const r=board.getBoundingClientRect();const cx=(ev.touches?ev.touches[0].clientX:ev.clientX);const cy=(ev.touches?ev.touches[0].clientY:ev.clientY);
  return[(cx-r.left)/r.width*intW(),(cy-r.top)/r.height*H_INT];
}
function fitBoard(){
  const stage=board.parentElement;if(!stage)return;
  const cs=getComputedStyle(stage);
  const padX=parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight);
  const padY=parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom);
  const availW=Math.max(40,stage.clientWidth-padX);
  const availH=Math.max(40,stage.clientHeight-padY);
  const[rw,rh]=ratioWH();const ar=rw/rh;
  let w=availW,h=w/ar;if(h>availH){h=availH;w=h*ar;}
  board.style.width=w+"px";board.style.height=h+"px";
}
function drawBoard(){
  fitBoard();
  const W=intW(),Hh=H_INT;
  board.setAttribute("viewBox","0 0 "+W+" "+Hh);
  let g="";
  for(let i=1;i<4;i++){const x=W*i/4,y=Hh*i/4;
    g+='<line class="grid" x1="'+x+'" y1="0" x2="'+x+'" y2="'+Hh+'"/><line class="grid" x1="0" y1="'+y+'" x2="'+W+'" y2="'+y+'"/>';
  }
  g+='<line class="axis" x1="'+(W/2)+'" y1="0" x2="'+(W/2)+'" y2="'+Hh+'" stroke-dasharray="4 6"/><line class="axis" x1="0" y1="'+(Hh/2)+'" x2="'+W+'" y2="'+(Hh/2)+'" stroke-dasharray="4 6"/>';
  state.elements.forEach(e=>{
    if(!e.bbox)return;const[ymin,xmin,ymax,xmax]=e.bbox;
    const[x1,y1]=px(xmin,ymin),[x2,y2]=px(xmax,ymax);
    const sel=e.id===selId;
    const cls="bx "+e.type+(sel?" sel":"");
    const lab=(e.type==="text"?(e.text||"texte"):(e.desc||"obj")).slice(0,22);
    g+='<g data-id="'+e.id+'"><rect class="'+cls+'" data-id="'+e.id+'" data-role="move" x="'+x1+'" y="'+y1+'" width="'+(x2-x1)+'" height="'+(y2-y1)+'" rx="3"/>'+
       '<text class="blabel" x="'+(x1+6)+'" y="'+(y1+16)+'">'+escapeHtml(lab)+'</text>';
    if(sel){const hs=6;[[x1,y1,"nw"],[x2,y1,"ne"],[x1,y2,"sw"],[x2,y2,"se"]].forEach(h=>{
      g+='<rect class="hnd" data-id="'+e.id+'" data-role="rs" data-c="'+h[2]+'" x="'+(h[0]-hs)+'" y="'+(h[1]-hs)+'" width="'+(hs*2)+'" height="'+(hs*2)+'"/>';});}
    g+='</g>';
  });
  board.innerHTML=g;
  const sel=state.elements.find(e=>e.id===selId);
  const ro=$("#coordReadout");
  if(sel&&sel.bbox){const[a,b,c,d]=sel.bbox;ro.innerHTML='<span><b>y_min</b> '+a+'</span><span><b>x_min</b> '+b+'</span><span><b>y_max</b> '+c+'</span><span><b>x_max</b> '+d+'</span>';} 
  else ro.innerHTML="";
  $("#canvasHint").textContent=sel?(sel.bbox?t("hint_move"):t("hint_draw")):t("hint_select");
}
let drag=null;
function down(ev){
  const tg=ev.target;const role=tg.dataset&&tg.dataset.role;
  ev.preventDefault();
  const[mx,my]=evtPt(ev);
  if(role==="rs"){const e=state.elements.find(x=>x.id===tg.dataset.id);selId=e.id;drag={mode:"rs",e,corner:tg.dataset.c};}
  else if(role==="move"){const e=state.elements.find(x=>x.id===tg.dataset.id);selId=e.id;
    const[ymin,xmin]=e.bbox;const[x1,y1]=px(xmin,ymin);drag={mode:"move",e,ox:mx-x1,oy:my-y1};renderElements();}
  else{const e=state.elements.find(x=>x.id===selId);if(!e)return;
    if(!e.bbox){drag={mode:"new",e,sx:mx,sy:my};}else return;}
  drawBoard();
  window.addEventListener("pointermove",moveDrag);window.addEventListener("pointerup",up);
}
function moveDrag(ev){
  if(!drag)return;const[mx,my]=evtPt(ev);const e=drag.e;
  if(drag.mode==="new"){
    const x1=Math.min(drag.sx,mx),y1=Math.min(drag.sy,my),x2=Math.max(drag.sx,mx),y2=Math.max(drag.sy,my);
    e.bbox=boxFromPx(x1,y1,x2,y2);
  }else if(drag.mode==="move"){const[ymin,xmin,ymax,xmax]=e.bbox;const[ox1,oy1]=px(xmin,ymin),[ox2,oy2]=px(xmax,ymax);
    const w=ox2-ox1,h=oy2-oy1;let nx1=mx-drag.ox,ny1=my-drag.oy;
    nx1=Math.max(0,Math.min(intW()-w,nx1));ny1=Math.max(0,Math.min(H_INT-h,ny1));
    e.bbox=boxFromPx(nx1,ny1,nx1+w,ny1+h);
  }else if(drag.mode==="rs"){let[ymin,xmin,ymax,xmax]=e.bbox;let[x1,y1]=px(xmin,ymin),[x2,y2]=px(xmax,ymax);
    const c=drag.corner;if(c.includes("w"))x1=mx;if(c.includes("e"))x2=mx;if(c.includes("n"))y1=my;if(c.includes("s"))y2=my;
    e.bbox=boxFromPx(Math.min(x1,x2),Math.min(y1,y2),Math.max(x1,x2),Math.max(y1,y2));}
  drawBoard();updateOutputs();
}
function boxFromPx(x1,y1,x2,y2){
  const xmin=clamp(Math.round(x1/intW()*1000)),xmax=clamp(Math.round(x2/intW()*1000));
  const ymin=clamp(Math.round(y1/H_INT*1000)),ymax=clamp(Math.round(y2/H_INT*1000));
  return[ymin,xmin,ymax,xmax];
}
function up(){if(drag){drag=null;renderElements();persist();}
  window.removeEventListener("pointermove",moveDrag);window.removeEventListener("pointerup",up);
}
board.addEventListener("pointerdown",down);

/* ---------------- outputs ---------------- */
function updateOutputs(){
  const json=JSON.stringify(buildPrompt(),null,2);
  $("#jsonOut").innerHTML=syntaxHL(json);
  const vl=$("#validList");vl.innerHTML="";
  validate().forEach(it=>{const li=document.createElement("li");li.className=it[0];
    li.innerHTML='<span class="dot"></span><span>'+escapeHtml(it[1])+'</span>';vl.appendChild(li);});
}
function currentJSON(){return JSON.stringify(buildPrompt(),null,2);}
function fallbackCopy(text){
  try{const ta=document.createElement("textarea");ta.value=text;ta.setAttribute("readonly","");
    ta.style.position="fixed";ta.style.top="-9999px";ta.style.left="-9999px";
    document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,text.length);
    const ok=document.execCommand("copy");document.body.removeChild(ta);return ok;
  }catch(e){return false;}
}
function copyText(text){
  if(navigator.clipboard&&navigator.clipboard.writeText)
    return navigator.clipboard.writeText(text).then(()=>true).catch(()=>fallbackCopy(text));
  return Promise.resolve(fallbackCopy(text));
}

/* ---------------- persistence ---------------- */
let persistT=null;
function persist(){clearTimeout(persistT);persistT=setTimeout(()=>{try{localStorage.setItem("ideogram_builder",JSON.stringify(state));}catch(e){}},250);}
function loadState(s){state=Object.assign(blankState(),s);state.style=Object.assign(blankState().style,s.style||{});
  state.elements=(s.elements||[]).map(e=>Object.assign(newEl(e.type||"obj"),e,{open:false}));
  selId=null;fillFormValues();renderElements();drawBoard();updateOutputs();}

/* import from raw Ideogram JSON */
function importJSON(raw){
  let o;try{o=JSON.parse(raw);}catch(e){toast(t("toast_json_invalid"));return false;}
  const s=blankState();
  s.high_level_description=o.high_level_description||"";
  const sd=o.style_description;
  if(sd){s.style.aesthetics=sd.aesthetics||"";s.style.lighting=sd.lighting||"";s.style.medium=sd.medium||"";
    s.style.color_palette=(sd.color_palette||[]).map(normHex).filter(Boolean);
    if(sd.photo!==undefined){s.style.mode="photo";s.style.photo=sd.photo||"";}
    else if(sd.art_style!==undefined){s.style.mode="art_style";s.style.art_style=sd.art_style||"";}
    else s.style.mode="art_style";
  }else s.style.mode="none";
  const cd=o.compositional_deconstruction||{};
  s.background=cd.background||"";
  s.elements=(cd.elements||[]).map(e=>Object.assign(newEl(e.type==="text"?"text":"obj"),{
    text:e.text||"",desc:e.desc||"",bbox:Array.isArray(e.bbox)&&e.bbox.length===4?e.bbox.map(n=>clamp(Math.round(n))):null,
    color_palette:(e.color_palette||[]).map(normHex).filter(Boolean),open:false}));
  loadState(s);persist();return true;
}

/* ---------------- wire up ---------------- */
function init(){
  applyI18n();
  buildChips();
  const tipEl=document.createElement("div");tipEl.className="tip";document.body.appendChild(tipEl);
  function showTip(icon){const tx=icon.getAttribute("data-tip");if(!tx)return;
    tipEl.textContent=tx;tipEl.classList.add("on");
    const r=icon.getBoundingClientRect();const tw=tipEl.offsetWidth,th=tipEl.offsetHeight;
    let left=r.left+r.width/2-tw/2;left=Math.max(8,Math.min(window.innerWidth-tw-8,left));
    let top=r.top-th-8;if(top<8)top=r.bottom+8;
    tipEl.style.left=left+"px";tipEl.style.top=top+"px";
  }
  function hideTip(){tipEl.classList.remove("on");}
  document.addEventListener("pointerover",e=>{const ic=e.target.closest&&e.target.closest(".info");if(ic)showTip(ic);});
  document.addEventListener("pointerout",e=>{const ic=e.target.closest&&e.target.closest(".info");if(ic)hideTip();});
  document.addEventListener("focusin",e=>{const ic=e.target.closest&&e.target.closest(".info");if(ic)showTip(ic);});
  document.addEventListener("focusout",e=>{const ic=e.target.closest&&e.target.closest(".info");if(ic)hideTip();});
  bindField("hld",v=>state.high_level_description=v);
  bindField("aesthetics",v=>state.style.aesthetics=v);
  bindField("lighting",v=>state.style.lighting=v);
  bindField("medium",v=>state.style.medium=v);
  bindField("photo",v=>state.style.photo=v);
  bindField("art_style",v=>state.style.art_style=v);
  bindField("background",v=>state.background=v);
  $("#styleMode").querySelectorAll("button").forEach(b=>b.onclick=()=>{state.style.mode=b.dataset.m;syncStyleFields();updateOutputs();persist();});
  $("#addText").onclick=()=>{const e=newEl("text");state.elements.push(e);selId=e.id;renderElements();drawBoard();updateOutputs();persist();};
  $("#addObj").onclick=()=>{const e=newEl("obj");state.elements.push(e);selId=e.id;renderElements();drawBoard();updateOutputs();persist();};
  $("#tpl").onchange=()=>{state=tpl($("#tpl").value);selId=null;fillFormValues();renderElements();drawBoard();updateOutputs();persist();};
  const copy=()=>{copyText(currentJSON()).then(ok=>toast(ok?t("toast_copied"):t("toast_copy_blocked")));};
  $("#copyBtn").onclick=copy;$("#copyBtn2").onclick=copy;
  $("#dlBtn").onclick=()=>{
    try{
      const blob=new Blob([currentJSON()],{type:"application/json"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;a.download="ideogram-prompt.json";a.rel="noopener";
      document.body.appendChild(a);a.click();
      setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},0);
    }catch(err){
      navigator.clipboard.writeText(currentJSON())
        .then(()=>toast(t("toast_dl_blocked")))
        .catch(()=>toast(t("toast_dl_unavail")));
    }
  };
  $("#importBtn").onclick=()=>{$("#importText").value="";$("#importModal").classList.add("on");};
  $("#importCancel").onclick=()=>$("#importModal").classList.remove("on");
  $("#importGo").onclick=()=>{if(importJSON($("#importText").value)){$("#importModal").classList.remove("on");toast(t("toast_imported"));}};
  window.addEventListener("resize",drawBoard);
  try{new ResizeObserver(()=>drawBoard()).observe(board.parentElement);}catch(e){}
  document.addEventListener("click",e=>{
    if(!e.target.closest("#ratioPop")&&!e.target.closest("#moreRatios"))$("#ratioPop").classList.remove("on");
  });

  let loaded=false;
  const ls=localStorage.getItem("ideogram_builder");if(ls){try{loadState(JSON.parse(ls));loaded=true;}catch(e){}}
  if(!loaded){state=tpl("poster");$("#tpl").value="poster";fillFormValues();renderElements();drawBoard();updateOutputs();}
}
init();
