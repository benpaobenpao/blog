<?php

class Quota extends CActiveRecord  {
    /**
     * model 的静态方法
     * @param type $className
     * @return type
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    // public function rules()
    // {
    //     return array(
    //         array('email', 'email', 'message'=>"邮箱不对"),
    //         array('password', 'match', 'pattern'=> '/^[a-zA-Z0-9_]{6,}$/', 'message'=>'密码位数不对' ),
    //         array('nickname', 'match', 'pattern' => '/^[a-zA-Z0-9_\x{4e00}-\x{9fa5}]{1,10}$/u' ,'message'=>'用户昵称由汉字，字母，数字，下划线组成')
    //     );
    // }

    /**
     * 对应表名
     * @return string
     */
    public function tableName() {
        return 'quotagame';
    }
    

}
