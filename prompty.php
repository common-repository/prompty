<?php
/*
Plugin Name: Prompty
Plugin URI: http://wordpress.org/extend/plugins/prompty/
Description: This plugin adds the prompt-like effect on the pre tag contents in your post. 
Version: 1.1
Author: Kei Saito
Author URI: 
License: GPL2
/*  
  Copyright 2011 Kei Saito (email : kei.saito@gmail.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/
/*
	This plugin adds the prompt-like effect on the pre tag contents in your post. 
	It is useful for showing command prompt or unix shell type of samples.
	
	Setup is just easy. You can just add the "prompty" to the class
	attribute to the pre tags that you want to have the effect in your post.  
	Then, you will see the "Play" button on each pre tag contents when you view it,
	and you can click it to see the "prompty" effect. 
	
	A post content HTML example:
	
	<pre class="prompty">
	% nslookup example.com
	Server:         192.168.0.254
	Address:        192.168.0.254#53
	
	Non-authoritative answer:
	Name:   example.com
	Address: 192.0.32.10
	</pre>
  
*/

function prompty_wp_head_action()
{
	?>
  <script language="javascript" src="wp-content/plugins/prompty/prompty.js"></script>
  <?php 
}
function prompty_wp_footer_action()
{
  ?>
  <script language="javascript">
  <!--
  
	//  You can add your own custom prompts here.  
	//  For example, if you want to make lines starting with 'SQL> ' 
	//  as prompt lines, you can modify the line like following.
  //
  //  prompty.prompts = ['% ', '# ', '> ', '$ ', 'SQL> '];
  //
  prompty.prompts = ['% ', '# ', '> ', '$ ' ];

	//  You can change the speed here.
	//  If you decrease the number, it works faster, and vice versa.
	//  For example, if you want to make it work twice faster than the default,
	//  you can modify the line like following.
	//  
	//  prompty.speed = 50;
  // 
  prompty.speed = 100;

  // You can change the button styles here.
  // The value format should be compatible to the CSS standard.
  prompty.style.padding = '1px';
  prompty.style.border = '1px solid #999999';
  prompty.style.color = '#999999';
  prompty.style.backgroundColor = '#ffffff';
  prompty.style.font = '8pt courier,sans-serif';
  prompty.style.innerHTML = '&gt;Play';

  // DO NOT REMOVE THIS LINE.
  prompty.setup();
  -->
  </script>
  
  <?php 
}

add_action( 'wp_head', prompty_wp_head_action );
add_action( 'wp_footer', prompty_wp_footer_action );

?>