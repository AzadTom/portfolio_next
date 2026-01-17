'use client';
import { useState } from "react";
import { data } from "./constant";
import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";

type SingleItemType = {
    id: string;
    title: string;
    description: string;
    status: string;
};

const KanBan = () => {
    const [list, setList] = useState<SingleItemType[]>(data);
    const handleEdit = (_item: SingleItemType) => {
        const item = list.map((item) => (item.id === _item.id ? _item : item));
        setList(item);
    };

    const handleDelete = (_item: SingleItemType) => {
        const filterItems = list.filter((item) => item.id !== _item.id);
        setList(filterItems);
    };

    const handleAddTodo = (item: SingleItemType) => {
        setList((prev) => [...prev, item]);
    };

    const handleDropTask = (taskId: string, status: string) => {

        console.log("id", taskId);
        console.log("status", status);
        setList(prev => {
            const updated = prev.map(item =>
                String(item.id) === String(taskId)
                    ? { ...item, status }
                    : item
            );

            console.log("UPDATED LIST", updated);
            return updated;
        });

    }

    return (
        <section className="flex justify-center items-center sm:h-screen col-span-2">
            <div className="flex flex-col gap-8 sm:flex-row bg-[#262626] py-4 px-8 border border-[#363636] text-white rounded-xl">
                <Column
                    onDropTask={handleDropTask}
                    data={list}
                    name="todo"
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleAddTodo={handleAddTodo}
                />
                <Column
                    onDropTask={handleDropTask}
                    data={list}
                    name="in progress"
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleAddTodo={handleAddTodo}
                />
                <Column
                    onDropTask={handleDropTask}
                    data={list}
                    name="completed"
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleAddTodo={handleAddTodo}
                />
            </div>
        </section>
    );
};
export default KanBan;

const Column = ({
    data,
    name,
    handleAddTodo,
    handleDelete,
    handleEdit,
    onDropTask,
}: {
    data: SingleItemType[];
    name: string;
    handleEdit: (item: SingleItemType) => void;
    handleDelete: (item: SingleItemType) => void;
    handleAddTodo: (item: SingleItemType) => void;
    onDropTask: (taskId: string, status: string) => void;
}) => {
    const filterData = data.filter((item) => item.status === name);
    const [open, setIsOpen] = useState(false);

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any) => {
        const taskId = e.dataTransfer.getData("taskId");
        onDropTask(taskId, name);
    };

    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            {open && (<CardInfoDetailModel handleModel={() => setIsOpen(false)} handleSubmit={handleAddTodo} id={String(crypto.randomUUID())} description="" status={name} title="" />)}
            <p className="mt-2 capitalize text-lg">{name}</p>
            <ul className="my-4 flex flex-col gap-4 w-full min-w-[320px] max-w-full sm:min-w-[360px] sm:max-w-[360px]">
                {filterData.map((item) => (
                    <Card 
                      key={item.id}
                        handleAddTodo={handleAddTodo}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        {...item}
                    />
                ))}
                <li onClick={() => setIsOpen(true)} className="border border-white rounded  min-h-16 flex gap-4 cursor-pointer justify-center items-center">
                    <Plus /> Add a task
                </li>
            </ul>
        </div>
    );
};

const Card = ({
    id,
    title,
    description,
    status,
    handleEdit,
    handleDelete,
    handleAddTodo,
}: SingleItemType & {
    handleEdit: (item: SingleItemType) => void;
    handleDelete: (item: SingleItemType) => void;
    handleAddTodo: (item: SingleItemType) => void;
}) => {

    const props = { id, title, description, status };
    const [open, setIsOpen] = useState(false);

    const handleDragStart = (e: any) => {
        e.dataTransfer.setData("taskId", id);
    };

    return (
        <>
            {open && (<CardInfoDetailModel handleModel={() => setIsOpen(false)} {...props} handleSubmit={(item: SingleItemType) => handleEdit(item)} />)}
            <li draggable={true} onDragStart={handleDragStart} className="bg-white text-black p-4 rounded cursor-pointer" onClick={() => setIsOpen((prev) => (!prev))}>
                <p className={cn("rounded w-[max-content] p-1 capitalize text-xs", status === "todo" ? "bg-amber-600" : status === "in progress" ? "bg-green-600" : "bg-pink-600")}>{status}</p>
                <p className="flex text-base gap-2 justify-between items-start font-medium">
                    {title}{" "}
                    <span
                        className="cursor-pointer"
                        onClick={() =>
                            handleDelete({
                                id: id,
                                title: title,
                                description: description,
                                status: status,
                            })
                        }
                    >
                        <Trash />
                    </span>
                </p>
                <p className="text-sm text-black/50 line-clamp-2">{description}</p>
            </li>
        </>

    );
};


const CardInfoDetailModel = ({ handleSubmit, description, id, status, title, handleModel }: SingleItemType & { handleSubmit: (item: SingleItemType) => void, handleModel: () => void }) => {


    const [state, setSate] = useState<SingleItemType>({
        id: id || "",
        description: description || "",
        status: status || "todo",
        title: title || "",
    })


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center" onClick={handleModel}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white text-black max-w-[1000px] h-full sm:h-auto  w-full mx-auto p-4 rounded ">
                <div className="flex flex-col gap-2">
                    <label htmlFor="status">Status</label>
                    <select defaultValue={state.status} onChange={(e) => setSate((prev) => ({ ...prev, status: e.target.value }))} name="status" id="status">
                        <option value="todo">To do</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="">Title</label>
                    <input value={state.title} onChange={(e) => setSate((prev) => ({ ...prev, title: e.target.value }))} type="text" className="h-[45px] px-4 py-2 rounded bg-gray-100" placeholder="Title" />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="">Description</label>
                    <textarea rows={5} value={state.description} onChange={(e) => setSate((prev) => ({ ...prev, description: e.target.value }))} className="px-4 py-2 rounded bg-gray-100" placeholder="Description" />
                </div>
                <div className="mt-5">
                    <button onClick={() => {
                        handleSubmit(state);
                        handleModel();
                    }} className="bg-black text-white w-full rounded-full h-[45px]">Submit</button>
                </div>
            </div>
        </div>
    )
} 
