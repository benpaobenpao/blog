<?php
class BlogsModule extends CWebModule {
    public function init() {
        $this->setImport(
            array(
                'blogs.models.*',
                'blogs.controllers.*',
//                'game.models.*'
                // 'game.controller'
            )
        );
    }
}

