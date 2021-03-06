# Astah_Jude_UML_export_to_Markdown-mermaid-Plantuml-
Use Astah JS plugin, export astah diagrams data (such as flowchart, class chart ) to mermaid text fomat and Plantuml format
Both of them could insert to *Markdown*

本项目提供将*Astah*中的UML图转换为文本图标格式的脚本，可以将Astah软件中的流程图，序列图，转换为*mermaid格式*和*Plantuml格式*
这两种格式都可以集成到markdown文件

Use text format to save UML diagrams, you could use svn or git to manage your software design document.

使用文本格式保存UML图，就可以对软件的设计文档进行版本管理

## Astah
Astah is a UML model design software, could ask its web http://astah.net/

Astah是专业的UML建模工具软件，请到其主页了解
http://astah.net/

You must install astah script plugin to use js script file of my project

使用本项目的js脚本，需要安装Astah的脚本插件，这是其插件的地址

https://github.com/ChangeVision/astah-script-plugin

[Download astah script plugin]( http://astah.change-vision.com/plugins/astah_script_plugin/1.0.4.html)

![](https://github.com/ChangeVision/astah-script-plugin/raw/master/doc/screenshots/script_dialog.png)

## mermaid
Generation of diagrams and flowcharts from text in a similar manner as markdown.

https://knsv.github.io/mermaid/

Haroopad could edit markdown file offline, and it support mermaid format
http://pad.haroopress.com/
mermaid just support *flowchart*  *sequence diagram* *gantt diagram*

离线markdown编辑工具*Haroopad* 支持mermaid格式，可直接嵌入到markdown文本中转为图显示
mermaid可以适用离线编辑，但只能支持支持流程图 序列图和甘特图

## Plantuml
*Plantuml* could support more UML diagram, but it need online, its source code need encode and convert to image.

http://plantuml.com/
*Plantuml*可以支持更多的UML格式，但是需要在线连接服务器解析，同时文本不能直接转为图，需要连接服务器转为特别的编码再解析为图

you could convert plantuml use the link
http://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000 

## How to use
1. Open Diagram in Astah
![](https://github.com/Avens666/Astah_Jude_UML_export_to_Markdown-mermaid-Plantuml-/blob/master/img/Image1.jpg)
2. Open Astah script tool (need install script plugin)
![](https://github.com/Avens666/Astah_Jude_UML_export_to_Markdown-mermaid-Plantuml-/blob/master/img/Image3.jpg)
3. Load js file in script tool dialog, run it (click play button or "ctrl+R" hotkey)
![](https://github.com/Avens666/Astah_Jude_UML_export_to_Markdown-mermaid-Plantuml-/blob/master/img/Image2.jpg)
4. script will convert diagram,and output to output area, could copy it to markdown

## view in Haroopad

![](https://github.com/Avens666/Astah_Jude_UML_export_to_Markdown-mermaid-Plantuml-/blob/master/img/Image4.jpg)

## Plantuml demo
<!--
  @startuml
  participant _KCacheManager
  participant _KDataLoader
  participant Hot
  _KCacheManager -> _KDataLoader:1.Message0
  _KDataLoader -> Hot:2.CreateMessage
  Hot -> Hot:3.Message7
  _KCacheManager -> _KDataLoader:4.Message5
  _KDataLoader ->> _KCacheManager:reply.123
  _KCacheManager ->> _KDataLoader:5.Message5
  Hot ->> _KDataLoader:6.getDataforMapDisp
  _KDataLoader -> Hot:6.1.CreateMessage
  _KDataLoader -> Hot:6.2.MessageRR
  Hot ->> _KDataLoader:reply.
  _KCacheManager ->> _KDataLoader:7.Message1
  Hot ->> _KDataLoader:8.Message0
  _KCacheManager ->> _KDataLoader:9.Message1
  Hot -> _KDataLoader:10.DestroyMessage
  @enduml
-->

![](http://www.plantuml.com/plantuml/png/XL4x3eCm3Drp2Yv0nAT0oy02GwMMXGjK5dKfKaMY90ktBmYYWa5bjD_p-yWIb6dhLa9ddCSjX_gD9NJGe69o1HLWu2xWIO2hC6nzvxZPYfxwl4Ij1yXZo_t86wxJWESAmU1COiFEGg6zJ8uyJfOP4GytoqYlLA7yzDmFmgqeKOr-gbCgWiUyGJFEBw5Aa4MhvMx5cFkav3uhi7vLDHbk7AViXy4JA-Jl1pylN_9VwaAbo7CzNg0sIlGpxGi0)
