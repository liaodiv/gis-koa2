
/**
 * Created by liao on 2018/2/20.
 */
import {Modal,Button,Form,Input} from 'antd';
import {ADD_GEOMETRY} from '../constants/model';

const Model =(props) => {
    const {modelType,confirmLoading} = props;
    return(
        <Modal
            title="添加数据"
            onOk={}
            onCancel={}
            visible={modelType}
            confirmLoading={confirmLoading}
        >
            <p>添加要素弹窗</p>

        </Modal>
    )
}
export default Modal;