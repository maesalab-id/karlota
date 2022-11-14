import { ActionIcon, createStyles, Group, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons';
import { useClient } from 'components/client';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { useRoom } from './RoomContext';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  content: Yup.string().required(),
});

export const InputBox = () => {
  const room = useRoom();
  const client = useClient();
  const { classes } = useStyles();

  const handleSubmit = useCallback(
    async (values, { setFieldValue, setSubmitting }) => {
      setSubmitting(false);
      const res = await client.service('chats').create({
        content: values['content'],
        recipientId: room.user.id,
        senderId: client.user.id,
      });
      console.log("Sent");
      setFieldValue('content', 'SENT');
    },
    [room, client]
  );

  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={{
        content: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Group className={classes.inputWrapper} spacing={'xs'} p="xs">
            <TextInput
              name="content"
              values={values['content']}
              style={{ flexGrow: 1 }}
              onChange={handleChange}
              placeholder="Send message"
            />
            <ActionIcon
              size="lg"
              type="submit"
              variant="filled"
              loading={isSubmitting}
              disabled={Object.keys(errors).length > 0}
            >
              <IconSend size={16} />
            </ActionIcon>
          </Group>
        </form>
      )}
    </Formik>
  );
};

const useStyles = createStyles((theme) => ({
  inputWrapper: {
    backgroundColor: 'white',
  },
}));
