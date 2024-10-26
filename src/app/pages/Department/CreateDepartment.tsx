
import { useState, useEffect } from "react";
import { departmentService } from "../../services/department/departmentService";
import Input from "@mui/joy/Input";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { Department } from "../../models/department";
import { Option, Select, Textarea } from "@mui/joy";



export const CreateDepartment = ({ department,onConfirm }: { department: Department;onConfirm:()=> void }) => {

    const [data, setData] = useState<Department>(department);

    useEffect(() => {

    }, [])


    return (
        <>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogContent>Fill in the information of the department.</DialogContent>
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    // event.preventDefault();
                    onConfirm()
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Department Name</FormLabel>
                        <Input required 
                            value={data.name}
                            onChange={(e) => {
                                    setData({...data,name: e.target.value})
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Senior</FormLabel>
                        <Select placeholder={data.parent_department_name} defaultValue={data.parent_department_id}>
                            <Option value="dog">Dog</Option>
                            <Option value="cat">Cat</Option>
                            <Option value="fish">Fish</Option>
                            <Option value="bird">Bird</Option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Type anything…"
                            value={data.description} 
                            minRows={2} 
                            maxRows={4} 
                            onChange={(e) => {
                                setData({...data,description: e.target.value})
                            }}
                        />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </>
    )


}