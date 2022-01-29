import React, { useEffect, useState } from 'react';
import { Drawer, Button, Form, Row, Col, Select, Input, Divider, InputNumber, message, Image } from 'antd';
import { AiFillCloseCircle, AiOutlineTeam } from 'react-icons/ai';
import { SelectCustomer } from './SelectCustomer';
import { SelectChief } from './SelectChief';
import axios from 'axios'
import { UploadController } from '../../own-comp';

const { Option } = Select;
const { TextArea } = Input;
export default function AddReport({ setSuccess }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startImage, setStartImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [form] = Form.useForm()
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 960) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const onFinish = (val) => {
        if (val.team.length <= 0) {
            message.error("សូមបញ្ជូលក្រុម!!");
            return
        }
        setLoading(true)
        createDailyConstruct({ ...val, userId: sessionStorage.getItem("u_id"), startImage, resultImage });
    }

    const createDailyConstruct = async (data) => {
        const params = new FormData();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify(data));
        params.append('startImage', data?.startImage);
        params.append('resultImage', data?.resultImage);

        return await axios.post(
            `${process.env.React_App_URL}/create/createDailyConstruct.php`, params,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(async function (response) {
                console.log(response?.data)
                if (response?.data !== "error" && response?.data !== "errorsize" && response?.data !== "errorextension") {
                    onClose();
                    message.info("បន្ថែមរបាយការណ៍ជោគជ័យ!!");
                    form.resetFields();
                    setLoading(false)
                    setSuccess(true)
                    // navigate(`/report/${response?.data}`)
                } else {
                    message.error("មានបញ្ហា!!")
                }
            });
    }

    const setConstructionCustomer = e => {
        form.setFieldsValue({
            customerId: e
        })
    }

    const setChief = e => {
        form.setFieldsValue({
            userId: e
        })
    }

    const onSelectStartImage = (e) => {
        console.log(e)

        let imageFile = e.target.files[0]
        if (imageFile.size > 2000000) {
            message.error("ទំហំរូបភាពធំ!!")
        } else {
            setStartImage(e.target.files[0])
        }

    }

    const onSelectResultImage = (e) => {

        let imageFile = e.target.files[0]
        if (imageFile.size > 2000000) {
            message.error("ទំហំរូបភាពធំ!!")
        } else {
            setResultImage(e.target.files[0])
        }

    }

    return <>
        <Button onClick={showDrawer} type="primary" size='large' style={{width:'100%'}}>+ បន្ថែមថ្មី</Button>
        
                <Drawer                 
                    width={isMobile ? '100%' : 736}
                    title="បន្ថែមរបាយការណ៍" 
                    placement="right" 
                    onClose={onClose} 
                    visible={visible}
                >
                    <Form encType='multipart/form-data' form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                        <Row gutter={10}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    // label="ឈ្មោះការដ្ឋាន"
                                    name="userId"
                                    rules={[{ required: true, message: 'ទាមទារបំពេញ' }]}
                                >
                                    <SelectChief title={"មេការ"} setValue={setChief} />
                                </Form.Item>

                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    // label="ឈ្មោះការដ្ឋាន"
                                    name="customerId"
                                    rules={[{ required: true, message: 'ទាមទារបំពេញ' }]}
                                >
                                    <SelectCustomer title={"ឈ្មោះការដ្ឋាន"} setValue={setConstructionCustomer} />
                                </Form.Item>

                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>

                                <Form.Item
                                    // label="ជ្រើសរើសដំណាក់កាល"
                                    name="status"
                                    rules={[{ required: true, message: 'ទាមទារបំពេញ' }]}
                                >
                                    <Select placeholder="ជ្រើសរើសដំណាក់កាល" size="large"
                                        style={{ width: "100%" }}

                                    >
                                        <Option value="រុះរើសំណង់ចាស់">រុះរើសំណង់ចាស់</Option>
                                        <Option value="ការងារទ្រួសត្រាយដី">ការងារទ្រួសត្រាយដី</Option>
                                        <Option value="ការងារវាស់វែង">ការងារវាស់វែង</Option>
                                        <Option value="រកកែងនៅទីតាំងផ្ទាល់ដី">រកកែងនៅទីតាំងផ្ទាល់ដី</Option>
                                        <Option value="សំអាតដី">សំអាតដី</Option>
                                        <Option value="បុកភ្ជើរ">បុកភ្ជើរ</Option>
                                        <Option value="ជីកដីធ្វើគ្រឹះ">ជីកដីធ្វើគ្រឹះ</Option>
                                        <Option value="លុបបំពេញរណ្តៅគ្រឹះ">លុបបំពេញរណ្តៅគ្រឹះ</Option>
                                        <Option value="ធ្វើធ្នឹមបាតក្រោម">ធ្វើធ្នឹមបាតក្រោម</Option>
                                        <Option value="ចាក់ដីលុបបំពេញផ្ទៃអគារ">ចាក់ដីលុបបំពេញផ្ទៃអគារ</Option>
                                        <Option value="ធ្វើសសរ">ធ្វើសសរ</Option>
                                        <Option value="ធ្វើធ្នឹម">ធ្វើធ្នឹម</Option>
                                        <Option value="បង្គប់ទីប">បង្គប់ទីប</Option>
                                        <Option value="ចាក់ប្លង់សេ">ចាក់ប្លង់សេ</Option>
                                        <Option value="រៀបឥដ្ឋ">រៀបឥដ្ឋ</Option>
                                        <Option value="បង្គប់ហ្គែន">បង្គប់ហ្គែន</Option>
                                        <Option value="ធ្វើជណ្តើរ">ធ្វើជណ្តើរ</Option>
                                        <Option value="បូកនិងសី">បូកនិងសី</Option>
                                        <Option value="ធ្វើដំបូល">ធ្វើដំបូល</Option>
                                        <Option value="ដាក់ទ្វា">ដាក់ទ្វា</Option>
                                        <Option value="ដាក់បង្អួច">ដាក់បង្អួច</Option>
                                        <Option value="ក្រាលការ៉ូ">ក្រាលការ៉ូ</Option>
                                        <Option value="បំពាក់គ្រឿងបន្ទប់ទឹក">បំពាក់គ្រឿងបន្ទប់ទឹក</Option>
                                        <Option value="ចាប់ជ្រីនិងចាប់ជ្រុង">ចាប់ជ្រីនិងចាប់ជ្រុង</Option>
                                        <Option value="បៀកថ្នាំ">បៀកថ្នាំ</Option>
                                        <Option value="រុញថ្នាំ">រុញថ្នាំ</Option>
                                        <Option value="បៀករ៉ង់និងសម្អាត">បៀករ៉ង់និងសម្អាត</Option>
                                        <Option value="បំពាក់អំពូល">បំពាក់អំពូល</Option>
                                        <Option value="សម្អាត">សម្អាត</Option>
                                        <Option value="កែលំអរចំនុចខ្វះខាត">កែលំអរចំនុចខ្វះខាត</Option>
                                        <Option value="រួចរាល់">រួចរាល់</Option>
                                    </Select>
                                </Form.Item>


                            </Col>
                        </Row>
                        < br />
                        <Form.List name="team" >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                        <div key={key} >

                                            <Row gutter={10}>
                                                <Col xs={24}>
                                                    <p style={{ fontSize: 20 }}><AiFillCloseCircle style={{ fontSize: 18 }}
                                                        className="remove-class zoom-bigger" onClick={() => remove(name)} />   <AiOutlineTeam /> {`ក្រុមទី៖ ${index + 1}`}
                                                    </p>
                                                </Col>
                                                <Col
                                                    xs={12} lg={12}
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'teamNumber']}
                                                        fieldKey={[fieldKey, 'teamNumber']}
                                                        initialValue={index + 1}
                                                        hidden
                                                    />

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'teamLeaderName']}
                                                        fieldKey={[fieldKey, 'teamLeaderName']}
                                                        rules={[{ required: true, message: 'ទាមទារបញ្ជូល' }]}
                                                    >
                                                        <Input
                                                            placeholder='ឈ្មោះមេក្រុម'
                                                            style={{ width: "100%" }}
                                                            size='large'
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={6} lg={6}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'builderCount']}
                                                        fieldKey={[fieldKey, 'builderCount']}
                                                        rules={[{ required: true, message: 'ទាមទារបញ្ជូល' }]}
                                                    >
                                                        <InputNumber placeholder='ចំនួនជាង' style={{ width: "100%" }} size='large' />
                                                    </Form.Item>

                                                </Col>

                                                <Col xs={6} lg={6}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'workerCount']}
                                                        fieldKey={[fieldKey, 'workerCount']}
                                                        rules={[{ required: true, message: 'ទាមទារបញ្ជូល' }]}
                                                    >
                                                        <InputNumber placeholder='ចំនួនកម្មករ' style={{ width: "100%" }} size='large' />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} lg={24}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'performance']}
                                                        fieldKey={[fieldKey, 'performance']}
                                                    >
                                                        <TextArea placeholder='ការអនុវត្តន៍' size="large" placeholder="ការងារអនុវត្តន៍" allowClear />
                                                    </Form.Item>
                                                    <Divider />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" size="large" onClick={() => add()} block >
                                            +បន្ថែមក្រុម
                                        </Button>
                                    </Form.Item>

                                </>
                            )}
                        </Form.List>

                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div
                                    style={{
                                        padding: "10px",
                                        marginTop: "-10px",
                                        textAlign: 'center'

                                    }}
                                >
                                    <p>រូបភាពចាប់ផ្ដើម</p>


                                    <UploadController
                                        name="startImage"
                                        accept="image/png, image/jpeg, image/jpg"
                                        // value={resultImage}
                                        onChange={onSelectStartImage}
                                    >
                                        Browse image
                                    </UploadController>

                                    <br />
                                    <br />
                                    {
                                        startImage ?
                                            <Image
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                                width={200}
                                                height={200}
                                                src={URL.createObjectURL(startImage)}
                                            />
                                            :
                                            <Image
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                                width={200}
                                                height={200}
                                                src={"error"}
                                                fallback="data:image/png;base64,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"
                                            />
                                    }

                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div
                                    style={{
                                        padding: "10px",
                                        marginTop: "-10px",
                                        textAlign: 'center'
                                    }}
                                >
                                    <p>រូបភាពបញ្ចប់</p>

                                    <UploadController
                                        name="resultImage"
                                        accept="image/png, image/jpeg, image/jpg"
                                        // value={resultImage}
                                        onChange={onSelectResultImage}
                                    >
                                        Browse image
                                    </UploadController>

                                    <br />
                                    <br />
                                    {
                                        resultImage ?
                                            <Image
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                                width={200}
                                                height={200}
                                                src={URL.createObjectURL(resultImage)}
                                            />
                                            :
                                            <Image
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                                width={200}
                                                height={200}
                                                src={"error"}
                                                fallback="data:image/png;base64,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"
                                            />
                                    }

                                </div>
                            </Col>
                        </Row>

                        <Form.Item>

                            <Button
                                type="primary"
                                style={{ width: '100%' }}
                                loading={loading}
                                size="large"
                                htmlType="submit"
                            >
                                បញ្ជូន
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            
    </>;
}
