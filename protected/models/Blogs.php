<?php

class Blogs extends CActiveRecord  {
    /**
     * model 的静态方法
     * @param type $className
     * @return type
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    /**
     * 对应表名
     * @return string
     */
    public function tableName() {
        return 'blogs';
    }

    public function rules()
    {
        return array(
            array('title', 'length', 'min'=>1, 'max'=>100 ,  'message'=>"文章标题长度不符合"),
            array('article', 'required',  'message'=>'文章内容不能为空' ),
            array('userID', 'required', 'message' => '亲，服务器忙'),
            array('id', 'required','message' => '亲，服务器忙'),
            array('date','required','message' => '亲，服务器忙')
        );
    }
}
