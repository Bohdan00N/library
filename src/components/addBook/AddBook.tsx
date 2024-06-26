import { useEffect, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import css from "./addBook.module.scss";
import { Library } from "../library/Library";
import { useAppDispatch } from "../../app/store";
import { useAddBookMutation } from "../../app/redux/api/bookApi";
import { addBookRequest } from "../../app/redux/api/types";
import { SubmitHandler } from "react-hook-form";
import { setBook } from "../../app/redux/features/bookSlice";
import { selectAuth } from "../../app/redux/features/authSlice";
import { useAppSelector } from "../../hooks/hooks";

export const AddBook = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const user = useAppSelector(selectAuth).userData.id;

  useEffect(() => {
    setClientReady(true);
  }, []);

  const dispatch = useAppDispatch();

  const [addBook, { data: addBookData, isSuccess: addBookSuccess }] =
    useAddBookMutation();

  const onFinish: SubmitHandler<addBookRequest> = async (values) => {
    const { title, author, publishYear, pagesTotal } = values;
    if (!title || !author || !publishYear || !pagesTotal || !clientReady) {
      console.error("Ошибка: Не все данные книги заполнены.");
      return;
    }

    try {
      await addBook({ title, author, publishYear, pagesTotal });
      form.resetFields();
    } catch (error) {
      console.error("Ошибка при добавлении книги:", error);
    }
  };

  useEffect(() => {
    if (addBookSuccess && addBookData) {
      const {
        title,
        author,
        publishYear,
        pagesTotal,
        pagesFinished,
        _id,
        __v,
      } = addBookData;
      if (title && author && publishYear && pagesTotal) {
        dispatch(
          setBook({
            userId: user!,
            book: {
              title,
              author,
              publishYear,
              pagesTotal,
              pagesFinished,
              _id,
              __v,
            },
          })
        );
        form.resetFields();
      }
    }
  }, [dispatch, addBookSuccess, addBookData, form, user]);

  return (
    <div className={css.addContainer}>
      <div className={css.add}>
        <Form
          form={form}
          labelCol={{ span: 300 }}
          wrapperCol={{ span: 150 }}
          layout="inline"
          style={{ minWidth: 700, gap: 15 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            className={css.input}
            name="title"
            label={"Book title"}
            rules={[
              {
                required: true,
                message: "Book title is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={css.input}
            name="author"
            label="Author"
            rules={[
              {
                required: true,
                message: "Author is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className={css.input}
            name="publishYear"
            label="Publication year"
            rules={[
              {
                required: true,
                message: "Publication year is required",
              },
            ]}
          >
            <InputNumber max={2024} />
          </Form.Item>

          <Form.Item
            className={css.input}
            name="pagesTotal"
            label="Amount of pages"
            rules={[
              {
                required: true,
                message: "Amount of pages is required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => <button className={css.btnAdd}>Add</button>}
          </Form.Item>
        </Form>
      </div>
      <div className={css.lib}>
        <Library />
      </div>
    </div>
  );
};
