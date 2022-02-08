!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.drupalMedia=t())}(self,(function(){return(()=>{var e={"ckeditor5/src/core.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/utils.js")},"ckeditor5/src/widget.js":(e,t,i)=>{e.exports=i("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,i),r.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";i.d(n,{default:()=>Z});var e=i("ckeditor5/src/core.js"),t=i("ckeditor5/src/widget.js");class a extends e.Command{execute(e){const t=this.editor.plugins.get("DrupalMediaEditing"),i=Object.entries(t.attrs).reduce(((e,[t,i])=>(e[i]=t,e)),{}),n=Object.keys(e).reduce(((t,n)=>(i[n]&&(t[i[n]]=e[n]),t)),{});if(this.editor.plugins.has("DrupalElementStyleEditing")){const t=this.editor.plugins.get("DrupalElementStyleEditing");for(const i of t.normalizedStyles)if(e[i.attributeName]&&i.attributeValue===e[i.attributeName]){n.drupalElementStyle=i.name;break}}this.editor.model.change((e=>{this.editor.model.insertContent(function(e,t){return e.createElement("drupalMedia",t)}(e,n))}))}refresh(){const e=this.editor.model,t=e.document.selection,i=e.schema.findAllowedParent(t.getFirstPosition(),"drupalMedia");this.isEnabled=null!==i}}class r extends e.Plugin{static get requires(){return[t.Widget]}init(){this.attrs={drupalMediaAlt:"alt",drupalMediaCaption:"data-caption",drupalMediaEntityType:"data-entity-type",drupalMediaEntityUuid:"data-entity-uuid",drupalMediaViewMode:"data-view-mode"};const e=this.editor.config.get("drupalMedia");if(!e)return;const{previewURL:t,themeError:i}=e;this.previewURL=t,this.labelError=Drupal.t("Preview failed"),this.themeError=i||`\n      <p>${Drupal.t("An error occurred while trying to preview the media. Please save your work and reload this page.")}<p>\n    `,this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertDrupalMedia",new a(this.editor))}async _fetchPreview(e,t){const i=await fetch(`${e}?${new URLSearchParams(t)}`,{headers:{"X-Drupal-MediaPreview-CSRF-Token":this.editor.config.get("drupalMedia").previewCsrfToken}});if(i.ok){return{label:i.headers.get("drupal-media-label"),preview:await i.text()}}return{label:this.labelError,preview:this.themeError}}_defineSchema(){this.editor.model.schema.register("drupalMedia",{allowWhere:"$block",isObject:!0,isContent:!0,allowAttributes:Object.keys(this.attrs)})}_defineConverters(){const e=this.editor.conversion;e.for("upcast").elementToElement({view:{name:"drupal-media"},model:"drupalMedia"}),e.for("dataDowncast").elementToElement({model:"drupalMedia",view:{name:"drupal-media"}}),e.for("editingDowncast").elementToElement({model:"drupalMedia",view:(e,{writer:i})=>{const n=i.createContainerElement("div",{class:"drupal-media"}),a=i.createRawElement("div",{"data-drupal-media-preview":"loading"},(t=>{this.previewURL?this._fetchPreview(this.previewURL,{text:this._renderElement(e),uuid:e.getAttribute("drupalMediaEntityUuid")}).then((({label:e,preview:i})=>{t.innerHTML=i,t.setAttribute("aria-label",e),t.setAttribute("data-drupal-media-preview","ready")})):(t.innerHTML=this.themeError,t.setAttribute("aria-label","drupal-media"),t.setAttribute("data-drupal-media-preview","unavailable"))}));return i.insert(i.createPositionAt(n,0),a),i.setCustomProperty("drupalMedia",!0,n),(0,t.toWidget)(n,i,{label:"media widget"})}}),e.for("editingDowncast").add((e=>{e.on("attribute:drupalElementStyle:drupalMedia",((e,t,i)=>{const n={alignLeft:"drupal-media-style-align-left",alignRight:"drupal-media-style-align-right",alignCenter:"drupal-media-style-align-center"},a=i.mapper.toViewElement(t.item),r=i.writer;n[t.attributeOldValue]&&r.removeClass(n[t.attributeOldValue],a),n[t.attributeNewValue]&&i.consumable.consume(t.item,e.name)&&r.addClass(n[t.attributeNewValue],a)}))})),Object.keys(this.attrs).forEach((t=>{e.attributeToAttribute({model:{key:t,name:"drupalMedia"},view:{name:"drupal-media",key:this.attrs[t]}})}))}_renderElement(e){const t=e.getAttributes();let i="<drupal-media";return Array.from(t).forEach((e=>{this.attrs[e[0]]&&"drupalMediaCaption"!==e[0]&&(i+=` ${this.attrs[e[0]]}="${e[1]}"`)})),i+="></drupal-media>",i}static get pluginName(){return"DrupalMediaEditing"}}var l=i("ckeditor5/src/ui.js");class s extends e.Plugin{init(){const e=this.editor,t=this.editor.config.get("drupalMedia");if(!t)return;const{libraryURL:i,openDialog:n,dialogSettings:a={}}=t;i&&"function"==typeof n&&e.ui.componentFactory.add("drupalMedia",(t=>{const r=e.commands.get("insertDrupalMedia"),s=new l.ButtonView(t);return s.set({label:Drupal.t("Insert Drupal Media"),icon:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1873 4.86414L10.2509 6.86414V7.02335H10.2499V15.5091C9.70972 15.1961 9.01793 15.1048 8.34069 15.3136C7.12086 15.6896 6.41013 16.8967 6.75322 18.0096C7.09631 19.1226 8.3633 19.72 9.58313 19.344C10.6666 19.01 11.3484 18.0203 11.2469 17.0234H11.2499V9.80173L18.1803 8.25067V14.3868C17.6401 14.0739 16.9483 13.9825 16.2711 14.1913C15.0513 14.5674 14.3406 15.7744 14.6836 16.8875C15.0267 18.0004 16.2937 18.5978 17.5136 18.2218C18.597 17.8877 19.2788 16.8982 19.1773 15.9011H19.1803V8.02687L19.1873 8.0253V4.86414Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5039 0.743652H0.386932V12.1603H13.5039V0.743652ZM12.3379 1.75842H1.55289V11.1454H1.65715L4.00622 8.86353L6.06254 10.861L9.24985 5.91309L11.3812 9.22179L11.7761 8.6676L12.3379 9.45621V1.75842ZM6.22048 4.50869C6.22048 5.58193 5.35045 6.45196 4.27722 6.45196C3.20398 6.45196 2.33395 5.58193 2.33395 4.50869C2.33395 3.43546 3.20398 2.56543 4.27722 2.56543C5.35045 2.56543 6.22048 3.43546 6.22048 4.50869Z" fill="black"/></svg>\n',tooltip:!0}),s.bind("isOn","isEnabled").to(r,"value","isEnabled"),this.listenTo(s,"execute",(()=>{n(i,(({attributes:t})=>{e.execute("insertDrupalMedia",t)}),a)})),s}))}}function o(e){return!!e&&e.is("element","drupalMedia")}function d(e){const i=e.getSelectedElement();return i&&function(e){return(0,t.isWidget)(e)&&!!e.getCustomProperty("drupalMedia")}(i)?i:null}function u(e){const t=typeof e;return null!=e&&("object"===t||"function"===t)}class c extends e.Plugin{static get requires(){return[t.WidgetToolbarRepository]}static get pluginName(){return"DrupalMediaToolbar"}afterInit(){const{editor:e}=this;var i;e.plugins.get(t.WidgetToolbarRepository).register("drupalMedia",{ariaLabel:Drupal.t("Drupal Media toolbar"),items:(i=e.config.get("drupalMedia.toolbar"),i.map((e=>u(e)?e.name:e))||[]),getRelatedElement:e=>d(e)})}}class m extends e.Command{refresh(){const e=this.editor.model.document.selection.getSelectedElement();this.isEnabled=!1,o(e)&&this._isMediaImage(e).then((e=>{this.isEnabled=e})),o(e)&&e.hasAttribute("drupalMediaAlt")?this.value=e.getAttribute("drupalMediaAlt"):this.value=!1}execute(e){const{model:t}=this.editor,i=t.document.selection.getSelectedElement();e.newValue=e.newValue.trim(),t.change((t=>{e.newValue.length>0?t.setAttribute("drupalMediaAlt",e.newValue,i):t.removeAttribute("drupalMediaAlt",i)}))}async _isMediaImage(e){const t=this.editor.config.get("drupalMedia");if(!t)return null;const{isMediaUrl:i}=t,n=new URLSearchParams({uuid:e.getAttribute("drupalMediaEntityUuid")}),a=await fetch(`${i}&${n}`);return a.ok?JSON.parse(await a.text()):null}}class g extends e.Plugin{static get pluginName(){return"MediaImageTextAlternativeEditing"}init(){this.editor.commands.add("mediaImageTextAlternative",new m(this.editor))}}function p(e){const t=e.editing.view,i=l.BalloonPanelView.defaultPositions;return{target:t.domConverter.viewToDom(t.document.selection.getSelectedElement()),positions:[i.northArrowSouth,i.northArrowSouthWest,i.northArrowSouthEast,i.southArrowNorth,i.southArrowNorthWest,i.southArrowNorthEast]}}var h=i("ckeditor5/src/utils.js");class f extends l.View{constructor(t){super(t),this.focusTracker=new h.FocusTracker,this.keystrokes=new h.KeystrokeHandler,this.labeledInput=this._createLabeledInputView(),this.saveButtonView=this._createButton(Drupal.t("Save"),e.icons.check,"ck-button-save"),this.saveButtonView.type="submit",this.cancelButtonView=this._createButton(Drupal.t("Cancel"),e.icons.cancel,"ck-button-cancel","cancel"),this._focusables=new l.ViewCollection,this._focusCycler=new l.FocusCycler({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"form",attributes:{class:["ck","ck-text-alternative-form","ck-responsive-form"],tabindex:"-1"},children:[this.labeledInput,this.saveButtonView,this.cancelButtonView]}),(0,l.injectCssTransitionDisabler)(this)}render(){super.render(),this.keystrokes.listenTo(this.element),(0,l.submitHandler)({view:this}),[this.labeledInput,this.saveButtonView,this.cancelButtonView].forEach((e=>{this._focusables.add(e),this.focusTracker.add(e.element)}))}_createButton(e,t,i,n){const a=new l.ButtonView(this.locale);return a.set({label:e,icon:t,tooltip:!0}),a.extendTemplate({attributes:{class:i}}),n&&a.delegate("execute").to(this,n),a}_createLabeledInputView(){const e=new l.LabeledFieldView(this.locale,l.createLabeledInputText);return e.label=Drupal.t("Override text alternative"),e}}class b extends e.Plugin{static get requires(){return[l.ContextualBalloon]}static get pluginName(){return"MediaImageTextAlternativeUi"}init(){this._createButton(),this._createForm()}destroy(){super.destroy(),this._form.destroy()}_createButton(){const t=this.editor;t.ui.componentFactory.add("mediaImageTextAlternative",(i=>{const n=t.commands.get("mediaImageTextAlternative"),a=new l.ButtonView(i);return a.set({label:Drupal.t("Override media image text alternative"),icon:e.icons.lowVision,tooltip:!0}),a.bind("isVisible").to(n,"isEnabled"),this.listenTo(a,"execute",(()=>{this._showForm()})),a}))}_createForm(){const e=this.editor,t=e.editing.view.document;this._balloon=this.editor.plugins.get("ContextualBalloon"),this._form=new f(e.locale),this._form.render(),this.listenTo(this._form,"submit",(()=>{e.execute("mediaImageTextAlternative",{newValue:this._form.labeledInput.fieldView.element.value}),this._hideForm(!0)})),this.listenTo(this._form,"cancel",(()=>{this._hideForm(!0)})),this._form.keystrokes.set("Esc",((e,t)=>{this._hideForm(!0),t()})),this.listenTo(e.ui,"update",(()=>{d(t.selection)?this._isVisible&&function(e){const t=e.plugins.get("ContextualBalloon");if(d(e.editing.view.document.selection)){const i=p(e);t.updatePosition(i)}}(e):this._hideForm(!0)})),(0,l.clickOutsideHandler)({emitter:this._form,activator:()=>this._isVisible,contextElements:[this._balloon.view.element],callback:()=>this._hideForm()})}_showForm(){if(this._isVisible)return;const e=this.editor,t=e.commands.get("mediaImageTextAlternative"),i=this._form.labeledInput;this._form.disableCssTransitions(),this._isInBalloon||this._balloon.add({view:this._form,position:p(e)}),i.fieldView.element.value=t.value||"",i.fieldView.value=i.fieldView.element.value,this._form.labeledInput.fieldView.select(),this._form.enableCssTransitions()}_hideForm(e){this._isInBalloon&&(this._form.focusTracker.isFocused&&this._form.saveButtonView.focus(),this._balloon.remove(this._form),e&&this.editor.editing.view.focus())}get _isVisible(){return this._balloon.visibleView===this._form}get _isInBalloon(){return this._balloon.hasView(this._form)}}class w extends e.Plugin{static get requires(){return[g,b]}static get pluginName(){return"MediaImageTextAlternative"}}function y(e,t,i){if(t.attributes)for(const[n,a]of Object.entries(t.attributes))e.setAttribute(n,a,i);t.styles&&e.setStyle(t.styles,i),t.classes&&e.addClass(t.classes,i)}function E(e){return t=>{t.on("element:drupal-media",((t,i,n)=>{const a=i.viewItem.parent;a.is("element","a")&&function(t,a){const r=e._consumeAllowedAttributes(t,n);r&&n.writer.setAttribute(a,r,i.modelRange)}(a,"htmlLinkAttributes")}),{priority:"low"})}}class v extends e.Plugin{init(){const{editor:e}=this;if(!e.plugins.has("GeneralHtmlSupport"))return;const{schema:t}=e.model,{conversion:i}=e,n=e.plugins.get("DataFilter");t.extend("drupalMedia",{allowAttributes:["htmlLinkAttributes"]}),i.for("upcast").add(E(n)),i.for("editingDowncast").add((e=>e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{if(!i.consumable.consume(t.item,"attribute:htmlLinkAttributes:drupalMedia"))return;const n=i.mapper.toViewElement(t.item),a=function(e,t,i){const n=e.createRangeOn(t);for(const{item:e}of n.getWalker())if(e.is("element",i))return e}(i.writer,n,"a");y(i.writer,t.item.getAttribute("htmlLinkAttributes"),a)}),{priority:"low"}))),i.for("dataDowncast").add((e=>e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{if(!i.consumable.consume(t.item,"attribute:htmlLinkAttributes:drupalMedia"))return;const n=i.mapper.toViewElement(t.item).parent;y(i.writer,t.item.getAttribute("htmlLinkAttributes"),n)}),{priority:"low"})))}static get pluginName(){return"DrupalMediaGeneralHtmlSupport"}}class k extends e.Plugin{static get requires(){return[r,v,s,c,w]}static get pluginName(){return"DrupalMedia"}}function M(){return e=>{e.on("element:a",((e,t,i)=>{const n=t.viewItem,a=(r=n,Array.from(r.getChildren()).find((e=>"drupal-media"===e.name)));var r;if(!a)return;if(!i.consumable.consume(n,{attributes:["href"]}))return;const l=n.getAttribute("href");if(!l)return;const s=i.convertItem(a,t.modelCursor);t.modelRange=s.modelRange,t.modelCursor=s.modelCursor;const o=t.modelCursor.nodeBefore;o&&o.is("element","drupalMedia")&&i.writer.setAttribute("linkHref",l,o)}),{priority:"high"})}}class A extends e.Plugin{static get requires(){return["LinkEditing","DrupalMediaEditing"]}static get pluginName(){return"DrupalLinkMediaEditing"}init(){const{editor:e}=this;e.model.schema.extend("drupalMedia",{allowAttributes:["linkHref"]}),e.conversion.for("upcast").add(M()),e.conversion.for("editingDowncast").add((e=>{e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{const{writer:n}=i;if(!i.consumable.consume(t.item,e.name))return;const a=i.mapper.toViewElement(t.item),r=Array.from(a.getChildren()).find((e=>"a"===e.name));if(r)t.attributeNewValue?n.setAttribute("href",t.attributeNewValue,r):(n.move(n.createRangeIn(r),n.createPositionAt(a,0)),n.remove(r));else{const e=Array.from(a.getChildren()).find((e=>e.getAttribute("data-drupal-media-preview"))),i=n.createContainerElement("a",{href:t.attributeNewValue});n.insert(n.createPositionAt(a,0),i),n.move(n.createRangeOn(e),n.createPositionAt(i,0))}}),{priority:"high"})})),e.conversion.for("dataDowncast").add((e=>{e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{const{writer:n}=i;if(!i.consumable.consume(t.item,e.name))return;const a=i.mapper.toViewElement(t.item),r=n.createContainerElement("a",{href:t.attributeNewValue});n.insert(n.createPositionBefore(a),r),n.move(n.createRangeOn(a),n.createPositionAt(r,0))}),{priority:"high"})}))}}class _ extends e.Plugin{static get requires(){return["LinkEditing","LinkUI","DrupalMediaEditing"]}static get pluginName(){return"DrupalLinkMediaUi"}init(){const{editor:e}=this,t=e.editing.view.document;this.listenTo(t,"click",((t,i)=>{this._isSelectedLinkedMedia(e.model.document.selection)&&(i.preventDefault(),t.stop())}),{priority:"high"}),this._createToolbarLinkMediaButton()}_createToolbarLinkMediaButton(){const{editor:e}=this;e.ui.componentFactory.add("drupalLinkMedia",(t=>{const i=new l.ButtonView(t),n=e.plugins.get("LinkUI"),a=e.commands.get("link");return i.set({isEnabled:!0,label:Drupal.t("Link media"),icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"/></svg>\n',keystroke:"Ctrl+K",tooltip:!0,isToggleable:!0}),i.bind("isEnabled").to(a,"isEnabled"),i.bind("isOn").to(a,"value",(e=>!!e)),this.listenTo(i,"execute",(()=>{this._isSelectedLinkedMedia(e.model.document.selection)?n._addActionsView():n._showUI(!0)})),i}))}_isSelectedLinkedMedia(e){const t=e.getSelectedElement();return!!t&&t.is("element","drupalMedia")&&t.hasAttribute("linkHref")}}class x extends e.Plugin{static get requires(){return[A,_]}static get pluginName(){return"DrupalLinkMedia"}}const{objectFullWidth:S,objectInline:C,objectLeft:V,objectRight:D,objectCenter:L,objectBlockLeft:I,objectBlockRight:B}=e.icons,T={inline:{name:"inline",title:"In line",icon:C,modelElements:["imageInline"],isDefault:!0},alignLeft:{name:"alignLeft",title:"Left aligned image",icon:V,modelElements:["imageBlock","imageInline"],className:"image-style-align-left"},alignBlockLeft:{name:"alignBlockLeft",title:"Left aligned image",icon:I,modelElements:["imageBlock"],className:"image-style-block-align-left"},alignCenter:{name:"alignCenter",title:"Centered image",icon:L,modelElements:["imageBlock"],className:"image-style-align-center"},alignRight:{name:"alignRight",title:"Right aligned image",icon:D,modelElements:["imageBlock","imageInline"],className:"image-style-align-right"},alignBlockRight:{name:"alignBlockRight",title:"Right aligned image",icon:B,modelElements:["imageBlock"],className:"image-style-block-align-right"},block:{name:"block",title:"Centered image",icon:L,modelElements:["imageBlock"],isDefault:!0},side:{name:"side",title:"Side image",icon:D,modelElements:["imageBlock"],className:"image-style-side"}},N={full:S,left:I,right:B,center:L,inlineLeft:V,inlineRight:D,inline:C},P=[{name:"imageStyle:wrapText",title:"Wrap text",defaultItem:"imageStyle:alignLeft",items:["imageStyle:alignLeft","imageStyle:alignRight"]},{name:"imageStyle:breakText",title:"Break text",defaultItem:"imageStyle:block",items:["imageStyle:alignBlockLeft","imageStyle:block","imageStyle:alignBlockRight"]}];function O(e){(0,h.logWarning)("image-style-configuration-definition-invalid",e)}const R={normalizeStyles:function(e){return(e.configuredStyles.options||[]).map((e=>function(e){e="string"==typeof e?T[e]?{...T[e]}:{name:e}:function(e,t){const i={...t};for(const n in e)Object.prototype.hasOwnProperty.call(t,n)||(i[n]=e[n]);return i}(T[e.name],e);"string"==typeof e.icon&&(e.icon=N[e.icon]||e.icon);return e}(e))).filter((t=>function(e,{isBlockPluginLoaded:t,isInlinePluginLoaded:i}){const{modelElements:n,name:a}=e;if(!(n&&n.length&&a))return O({style:e}),!1;{const a=[t?"imageBlock":null,i?"imageInline":null];if(!n.some((e=>a.includes(e))))return(0,h.logWarning)("image-style-missing-dependency",{style:e,missingPlugins:n.map((e=>"imageBlock"===e?"ImageBlockEditing":"ImageInlineEditing"))}),!1}return!0}(t,e)))},getDefaultStylesConfiguration:function(e,t){return e&&t?{options:["inline","alignLeft","alignRight","alignCenter","alignBlockLeft","alignBlockRight","block","side"]}:e?{options:["block","side"]}:t?{options:["inline","alignLeft","alignRight"]}:{}},getDefaultDropdownDefinitions:function(e){return e.has("ImageBlockEditing")&&e.has("ImageInlineEditing")?[...P]:[]},warnInvalidStyle:O,DEFAULT_OPTIONS:T,DEFAULT_ICONS:N,DEFAULT_DROPDOWN_DEFINITIONS:P};function j(e,t){const i=e.getSelectedElement();return i&&t.checkAttribute(i,"drupalElementStyle")?i:e.getFirstPosition().findAncestor((e=>t.checkAttribute(e,"drupalElementStyle")))}class F extends e.Command{constructor(e,t){super(e),this._styles=new Map(t.map((e=>[e.name,e])))}refresh(){const e=this.editor,t=j(e.model.document.selection,e.model.schema);this.isEnabled=!!t,this.isEnabled&&t.hasAttribute("drupalElementStyle")?this.value=t.getAttribute("drupalElementStyle"):this.value=!1}execute(e={}){const t=this.editor.model;t.change((i=>{const n=e.value,a=j(t.document.selection,t.schema);!n||this._styles.get(n).isDefault?i.removeAttribute("drupalElementStyle",a):i.setAttribute("drupalElementStyle",n,a)}))}}function H(e,t){for(const i of t)if(i.name===e)return i}class U extends e.Plugin{init(){const t=this.editor;t.config.define("drupalElementStyles",{options:[]});const i=t.config.get("drupalElementStyles").options;this.normalizedStyles=i.map((t=>("string"==typeof t.icon&&e.icons[t.icon]&&(t.icon=e.icons[t.icon]),t))).filter((e=>e.attributeName&&e.attributeValue?e.modelElements&&Array.isArray(e.modelElements)?!!e.name||(console.warn("drupalElementStyles options must include a name."),!1):(console.warn("drupalElementStyles options must include an array of supported modelElements."),!1):(console.warn("drupalElementStyles options must include attributeName and attributeValue."),!1))),this._setupConversion(),t.commands.add("drupalElementStyle",new F(t,this.normalizedStyles))}_setupConversion(){const e=this.editor,t=e.model.schema,i=(n=this.normalizedStyles,(e,t,i)=>{if(!i.consumable.consume(t.item,e.name))return;const a=H(t.attributeNewValue,n),r=H(t.attributeOldValue,n),l=i.mapper.toViewElement(t.item),s=i.writer;r&&("class"===r.attributeName?s.removeClass(r.attributeValue,l):s.removeAttribute(r.attributeName,l)),a&&("class"===a.attributeName?s.addClass(a.attributeValue,l):s.setAttribute(a.attributeName,a.attributeValue,l))});var n;const a=function(e){const t=e.filter((e=>!e.isDefault));return(e,i,n)=>{if(!i.modelRange)return;const a=i.viewItem,r=(0,h.first)(i.modelRange.getItems());if(r&&n.schema.checkAttribute(r,"drupalElementStyle"))for(const e of t)if("class"===e.attributeName)n.consumable.consume(a,{classes:e.attributeValue})&&n.writer.setAttribute("drupalElementStyle",e.name,r);else if(n.consumable.consume(a,{attributes:[e.attributeName]}))for(const e of t)e.attributeValue===a.getAttribute(e.attributeName)&&n.writer.setAttribute("drupalElementStyle",e.name,r)}}(this.normalizedStyles);e.editing.downcastDispatcher.on("attribute:drupalElementStyle",i),e.data.downcastDispatcher.on("attribute:drupalElementStyle",i);[...new Set(this.normalizedStyles.map((e=>e.modelElements)).flat())].forEach((e=>{t.extend(e,{allowAttributes:"drupalElementStyle"})})),e.data.upcastDispatcher.on("element",a,{priority:"low"})}static get pluginName(){return"DrupalElementStyleEditing"}}const W=e=>e,K=(e,t)=>(e?`${e}: `:"")+t;function z(e){return`drupalElementStyle:${e}`}class q extends e.Plugin{static get requires(){return[U]}init(){const e=this.editor.plugins,t=this.editor.config.get("drupalMedia.toolbar")||[],i=Object.values(e.get("DrupalElementStyleEditing").normalizedStyles);i.forEach((e=>{this._createButton(e)}));t.filter(u).forEach((e=>{this._createDropdown(e,i)}))}_createDropdown(e,t){const i=this.editor.ui.componentFactory;i.add(e.name,(n=>{let a;const{defaultItem:r,items:s,title:o}=e,d=s.filter((e=>t.find((({name:t})=>z(t)===e)))).map((e=>{const t=i.create(e);return e===r&&(a=t),t}));s.length!==d.length&&R.warnInvalidStyle({dropdown:e});const u=(0,l.createDropdown)(n,l.SplitButtonView),c=u.buttonView;return(0,l.addToolbarToDropdown)(u,d),c.set({label:K(o,a.label),class:null,tooltip:!0}),c.bind("icon").toMany(d,"isOn",((...e)=>{const t=e.findIndex(W);return t<0?a.icon:d[t].icon})),c.bind("label").toMany(d,"isOn",((...e)=>{const t=e.findIndex(W);return K(o,t<0?a.label:d[t].label)})),c.bind("isOn").toMany(d,"isOn",((...e)=>e.some(W))),c.bind("class").toMany(d,"isOn",((...e)=>e.some(W)?"ck-splitbutton_flatten":null)),c.on("execute",(()=>{d.some((({isOn:e})=>e))?u.isOpen=!u.isOpen:a.fire("execute")})),u.bind("isEnabled").toMany(d,"isEnabled",((...e)=>e.some(W))),u}))}_createButton(e){const t=e.name;this.editor.ui.componentFactory.add(z(t),(i=>{const n=this.editor.commands.get("drupalElementStyle"),a=new l.ButtonView(i);return a.set({label:e.title,icon:e.icon,tooltip:!0,isToggleable:!0}),a.bind("isEnabled").to(n,"isEnabled"),a.bind("isOn").to(n,"value",(e=>e===t)),a.on("execute",this._executeCommand.bind(this,t)),a}))}_executeCommand(e){this.editor.execute("drupalElementStyle",{value:e}),this.editor.editing.view.focus()}static get pluginName(){return"DrupalElementStyleUi"}}class $ extends e.Plugin{static get requires(){return[U,q]}static get pluginName(){return"DrupalElementStyle"}}const Z={DrupalMedia:k,MediaImageTextAlternative:w,MediaImageTextAlternativeEditing:g,MediaImageTextAlternativeUi:b,DrupalLinkMedia:x,DrupalElementStyle:$}})(),n=n.default})()}));