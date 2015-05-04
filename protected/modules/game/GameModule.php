<?php
class GameModule extends CWebModule {
    public function init() {
        $this->setImport(
            array(
                'game.models.*',
                'game.controllers.*'
            )
        );
    }
}

