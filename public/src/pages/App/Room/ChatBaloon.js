import {
  ActionIcon,
  createStyles,
  Group,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconCheck, IconChecks } from '@tabler/icons';
import { MESSAGE_STATUS } from 'components/constants';

export const ChatBaloon = ({
  id,
  type,
  content,
  alt,
  name,
  timestamp,
  status,
}) => {
  const { classes } = useStyles({ isSender: alt });
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {/* <Group>
          <Text size="sm" weight={'bold'} className={classes.name}>
            {name}
          </Text>
        </Group> */}
        <Text size="sm" className={classes.content}>
          <span className={classes.contentText}>{content}</span>

          <span className={classes.contentSpace}>
            <Text size="xs" pl={4} className={classes.timestamp}>
              {timestamp}
            </Text>
            {!alt && (
              <div className={classes.tickStatus}>
                {status === MESSAGE_STATUS['SENT'] && <IconCheck size={16} />}
                {status === MESSAGE_STATUS['DELIVERED'] && (
                  <IconChecks size={16} />
                )}
                {status === MESSAGE_STATUS['READ'] && (
                  <IconChecks size={16} color="blue[5]" />
                )}
              </div>
            )}
          </span>
        </Text>

        <div className={classes.timestampWrapper}>
          <Text size="xs" className={classes.timestamp}>
            {timestamp}
          </Text>
          {!alt && (
            <div className={classes.tickStatus}>
              {status === MESSAGE_STATUS['SENT'] && <IconCheck size={16} />}
              {status === MESSAGE_STATUS['DELIVERED'] && (
                <IconChecks size={16} />
              )}
              {status === MESSAGE_STATUS['READ'] && (
                <IconChecks size={16} color="blue[5]" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = createStyles((theme, { isSender }) => ({
  wrapper: {
    overflow: 'hidden',
  },
  container: {
    backgroundColor: isSender ? 'white' : theme.colors.green[1],
    borderRadius: theme.radius.sm,
    borderTopLeftRadius: isSender ? 0 : theme.radius.sm,
    borderTopRightRadius: isSender ? theme.radius.sm : 0,
    marginBottom: theme.spacing.md,
    marginLeft: isSender ? theme.spacing.lg : 0,
    marginRight: isSender ? 0 : theme.spacing.lg,
    padding: theme.spacing.xs,
    position: 'relative',
    boxShadow:
      '0px 2px 1px rgb(0 0 0 / 10%), inset 0px 2px 1px rgb(255 255 255 / 25%)',
    maxWidth: '75%',
    float: isSender ? 'left' : 'right',

    '&:after': {
      content: `""`,
      borderWidth: 10,
      borderTop: `15px solid ${isSender ? 'white' : theme.colors.green[1]}`,
      borderLeft: '15px solid transparent',
      transform: `scaleX(${isSender ? 1 : -1})`,
      height: 0,
      width: 0,
      position: 'absolute',
      right: isSender ? '100%' : 'auto',
      left: isSender ? 'auto' : '100%',
      top: 0,
    },
  },
  name: {
    color: isSender ? theme.colors.blue[5] : theme.colors.green[5],
    flexGrow: 1,
  },
  timestampWrapper: {
    position: 'absolute',
    color: theme.colors.gray[6],
    bottom: theme.spacing.xs / 2,
    right: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
  },
  timestamp: {
    display: 'inline-block',
  },
  tickStatus: {
    display: 'inline-flex',
  },
  content: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
  },
  contentText: {
    userSelect: 'text',
  },
  contentSpace: { visibility: 'hidden' },
}));
