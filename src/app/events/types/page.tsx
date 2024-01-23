'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Main, Sidebar } from '@/components'
import { articleMenus, eventMenus } from '@/data/staticData'
import { AddRounded, Close } from '@mui/icons-material'
import { FormType } from '../components'
import { useRouter } from 'next/navigation'
import { getToken } from '@/utils/token'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ListTypeItem from '../components/ListTypeItem'

const Types = () => {
  const [activeMenu, setActiveMenu] = useState<string>('Types')
  const [openModalAddType, setOpenModalAddType] = useState<boolean>(false)
  // Define state for the selected category and modal visibility separately
  const [openModalEditCategory, setOpenModalEditType] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Open the edit modal and set the selected category when Edit button is clicked
  const modalEditCategory = (category: any) => {
    setSelectedCategory(category); // Set the selected category when opening the modal
    setOpenModalEditType(true);
  };

  const [types, setTypes] = useState<any[]>([])
  const typesIsLoading = [1, 2, 3, 4, 5, 6]
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const storedToken = getToken()

  const fetchTypes = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get('/api/event/types');

      setTypes(response.data.data)
      setIsLoading(false)
      console.log(response)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const handleDeleteType = async (id: number) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the type. This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1B4E6B',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then(async (result: any) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://resource.candidatecollegeind.com/api/event/types/${id}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                console.log(response);

                // Optionally show a success message
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'The type has been deleted.',
                    icon: 'success',
                });

                // Perform any other actions after successful deletion, e.g., redirecting the user, refreshing the article list, etc.
                fetchTypes()

            } catch (error) {
                console.error(error);

                // Show an error message if the delete operation fails
                MySwal.fire({
                    title: 'Error',
                    text: 'Failed to delete the type. Please try again later.',
                    icon: 'error',
                });
            }
        }
    })
  }

  const handleTypeUploadSuccess = () => {
    fetchTypes(); // Update the list with the new category
    setOpenModalAddType(false); // Close the popup
  };

  const handleTypeEditSuccess = () => {
    fetchTypes(); // Update the list with the new category
    setOpenModalEditType(false); // Close the popup
  };

  const ModalAddType = () => {
    return (
        <section className='w-full h-screen absolute md:flex md:items-start md:justify-center top-0 bg-[rgba(0,0,0,0.5)]'>
            <div className="flex flex-col-gap-2 bg-white rounded-xl h-fit opacity-100 mx-5 mt-[10vh] relative md:w-[45%]">
                <FormType onClose={handleTypeUploadSuccess} isEdit={false} category={null} />
                <span className='text-2xl absolute top-4 right-5 text-primary cursor-pointer' onClick={(e) => setOpenModalAddType(false)}>
                    <Close fontSize='inherit' color='inherit' />
                </span>
            </div>
        </section>
    )
  }

  const ModalEditCategory = (category: any) => {
    return (
      <section className="w-full h-screen absolute md:flex md:items-start md:justify-center top-0 bg-[rgba(0,0,0,0.5)]">
        <div className="flex flex-col-gap-2 bg-white rounded-xl h-fit opacity-100 mx-5 mt-[10vh] relative md:w-[45%]">
          <FormType onClose={handleTypeEditSuccess} isEdit={true} category={category} />
          <span
            className="text-2xl absolute top-4 right-5 text-primary cursor-pointer"
            onClick={(e) => setOpenModalEditType(false)} // Use the onClose function to close the modal
          >
            <Close fontSize="inherit" color="inherit" />
          </span>
        </div>
      </section>
    );
  };

  useEffect(() => {
    if (!storedToken) {
      router.push('/auth');
    }
  }, [storedToken, router]);

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Events'} />

      {/* Main */}
      <Main active={'Types'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
            <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[800px] h-full no-scrollbar scrollbar-hide">
              {
                eventMenus?.map((menu, index) => (
                  <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-fit duration-700 transition-all`}>{menu.name}</Link>
                ))
              }
            </div>

            <ul className="flex flex-col gap-3">
              {isLoading ? (
                typesIsLoading.map((type, index) => (
                  <ListTypeItem type={type} key={index} handleDeleteType={handleDeleteType} isLoading={true} />
                ))
              ) : (
                types.map((type, index) => (
                  <ListTypeItem
                  type={type}
                    key={index}
                    handleDeleteType={handleDeleteType}
                    onEdit={modalEditCategory} 
                    isLoading={false}
                  />
                ))
              )}
            </ul>

            <div onClick={(e) => setOpenModalAddType(true)} className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-extrabold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
                <AddRounded color='inherit' fontSize='inherit' fontWeight={700} />
            </div>
      </Main>
      
      {/* Modal Categories */}
      {openModalAddType ? <ModalAddType /> : null}

      {/* Pass the selected category and onClose handler to the edit modal */}
      {openModalEditCategory ? (
        <ModalEditCategory category={selectedCategory} />
      ) : null}
    </main>
  )
}

export default Types