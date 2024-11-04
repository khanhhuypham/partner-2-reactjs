import { ContentOfModalConfirm } from "../../../component/modal/ModalConfirm";
import { User } from "../../../models/user/user";
import { EmployeeList } from "./EmployeeList";


export const contentOfResetPwdModal = ({ data, onClose, onConfirm }:
    {
        data: User;
        onClose: (() => void);
        onConfirm: (() => void);
    }
): JSX.Element => {
    let content = (
        <div className="text-center my-4">
            <i className="fa-solid fa-arrows-spin text-4xl"></i>
            <p>
                Are you sure want to reset password for the employee
                <span className="text-blue-700">({data.name})</span> ?
            </p>

            <p>
                This action won't be able to undo
            </p>

        </div>
    )
    let title = (
        <h1 className='text-2xl text-center text-red-600'>Reset Password</h1>
    )

    return <ContentOfModalConfirm
        title={title}
        content={content}
        onClose={onClose}
        onConfirm={onConfirm}
    />
}





export const contentOfSuccessfullCreateUser = ({ data, onClose, onConfirm }:
    {
        data: User;
        onClose: (() => void);
        onConfirm: (() => void);
    }
): JSX.Element => {
    let content = (
        <div>
            <div className='grid grid-cols-3 gap-1'>
                <span className="col-span-1">Company Name</span>
                <span className="font-semibold">asdasdsa</span>
            </div>

            <div className='grid grid-cols-3 gap-1'>
                <span className="col-span-1">Phone</span>
                <span className="font-semibold">{data.phone}</span>
            </div>

            <div className='grid grid-cols-3 gap-1'>
                <span className="col-span-1">Password</span>
                <span className="font-semibold"> {data.password}</span>
            </div>

        </div>
    )
    let title = (
        <h1 className='text-2xl text-center text-red-600'>Reset password</h1>
    )

    return <ContentOfModalConfirm
        title={title}
        content={content}
        onClose={onClose}
        onConfirm={onConfirm}
    />
}



