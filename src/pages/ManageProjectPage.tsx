import NextPrevButton from "@/components/NextPrevButton";
import PageHeader from "@/components/PageHeader";
import { ID_KEY, whoManageProjectTypeList } from "@/constant";
import { usePagination } from "@/context/PaginationContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ManageType } from "@/types";
import { FormEvent, useState } from "react";

const ManageProjectPage = () => {
  const mainTitle = "Who can manage projects";
  const subTitle =
    "Don't panic - You can also customize this permissions in settings";
    
  const MANAGE_TYPE_KEY = "Manage_Type";
  const {goToNextPage} = usePagination();
  const {saveDataToStorage, getStoredData} = useLocalStorage();
  const [selectedManageType, setSelectedManageType] = useState(whoManageProjectTypeList[0]);

  function handleSelectWhoManageProject(value:ManageType){
    setSelectedManageType(value);
  }

  function handleSubmit(e:FormEvent){
    e.preventDefault();

    const storedManageTypeData = getStoredData(MANAGE_TYPE_KEY);
    const storedId = getStoredData(ID_KEY);

    if(storedManageTypeData){
      const updatedManageType = [...storedManageTypeData, {...selectedManageType, _id:storedId}];
      saveDataToStorage(MANAGE_TYPE_KEY, updatedManageType);
    }else{
      saveDataToStorage(MANAGE_TYPE_KEY, [{...selectedManageType, _id:storedId}]);
    }

    goToNextPage();
    
  }
  return (
    <>
    <PageHeader mainTitle={mainTitle} subTitle={subTitle} />
    <form className="w-full flex-1 flex flex-col items-center justify-start space-y-6" onSubmit={handleSubmit}>
      <div className="w-full flex-1 space-y-3">
        {whoManageProjectTypeList.map((item:ManageType) => (
          <div
          className={`w-full p-3 min-h-[5rem] border border-light rounded-md flex items-center gap-3 cursor-pointer bg-gray-50 ${item.id === selectedManageType.id && "border-primary border-2"}`}
          onClick={()=>{handleSelectWhoManageProject(item)}}
          key={item.id}
          >
            {<item.icon className={`h-12 w-12 text-light ${item.id === selectedManageType.id && "text-zinc-500"}`} />}
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className={`text-xs text-light ${item.id === selectedManageType.id && "text-zinc-600"}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <NextPrevButton />
    </form>
          </>
  );
};

export default ManageProjectPage;
