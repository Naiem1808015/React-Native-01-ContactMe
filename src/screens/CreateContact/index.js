import React, {useContext, useEffect, useRef, useState} from 'react';
import CreateContactComponent from '../../components/CreateContactComponent';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CONTACT_DETAIL} from '../../constants/routeNames';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';
import editContact from '../../context/actions/contacts/editContact';

const CreateContact = () => {
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);
  const {navigate, setOptions} = useNavigation();
  const {params} = useRoute();

  const [localFile, setLocalFile] = useState(null);

  useEffect(() => {
    if (params?.contact) {
      setOptions({title: 'Update contact'});
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;

      setForm((prev) => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find((item) => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm((prev) => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }

      if (params?.contact?.contact_picture) {
        setLocalFile(params?.contact.contact_picture);
      }
    }
  }, []);
  // console.log('form:>>', form);
  // console.log('localFILE:>>', localFile);

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const onFileSelected = (image) => {
    closeSheet();
    setLocalFile(image);
    // console.log('image:', image);
  };

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  // console.log('loading:>>', loading);

  const onSubmit = () => {
    if (params?.contact) {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)((url) => {
          setIsUploading(false);
          // console.log('after upload url:>>', url);

          editContact(
            {...form, contactPicture: url},
            params?.contact.id,
          )(contactsDispatch)((item) => {
            navigate(CONTACT_DETAIL, {item});
          });
        })((err) => {
          console.log('after upload error:>>', err);
          setIsUploading(false);
        });
      } else {
        editContact(form, params?.contact.id)(contactsDispatch)((item) => {
          navigate(CONTACT_DETAIL, {item});
        });
      }
    } else {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)((url) => {
          setIsUploading(false);
          // console.log('after upload url:>>', url);

          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_DETAIL, {});
            },
          );
        })((err) => {
          // console.log('after upload error:>>', err);
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACT_DETAIL, {});
        });
      }
    }
  };

  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading || uploading}
      toggleValueChange={toggleValueChange}
      error={error}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
