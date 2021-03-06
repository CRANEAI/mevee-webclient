import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import getFromUserSettings from '/imports/ui/services/users-settings';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import { styles } from './styles';

const intlMessages = defineMessages({
  joinAudio: {
    id: 'app.audio.joinAudio',
    description: 'Join audio button label',
  },
  leaveAudio: {
    id: 'app.audio.leaveAudio',
    description: 'Leave audio button label',
  },
  muteAudio: {
    id: 'app.actionsBar.muteLabel',
    description: 'Mute audio button label',
  },
  unmuteAudio: {
    id: 'app.actionsBar.unmuteLabel',
    description: 'Unmute audio button label',
  },
});

const propTypes = {
  processToggleMuteFromOutside: PropTypes.func.isRequired,
  handleToggleMuteMicrophone: PropTypes.func.isRequired,
  handleJoinAudio: PropTypes.func.isRequired,
  handleLeaveAudio: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  showMute: PropTypes.bool.isRequired,
  inAudio: PropTypes.bool.isRequired,
  listenOnly: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  talking: PropTypes.bool.isRequired,
  amIModerator:  PropTypes.bool.isRequired
};

class AudioControls extends PureComponent {


  constructor(props) {
    super(props);
    this.listenBtn = React.createRef();
    this.talkBtn = React.createRef();
    this.audioMap = this.audioMap.bind(this);

  }

  componentDidMount() {
    const { processToggleMuteFromOutside } = this.props;
    if (Meteor.settings.public.allowOutsideCommands.toggleSelfVoice
      || getFromUserSettings('bbb_outside_toggle_self_voice', false)) {
      window.addEventListener('message', processToggleMuteFromOutside);

    }

    window.audioMap = this.audioMap
    window.processToggleMuteFromOutside = processToggleMuteFromOutside
   

  }


  audioMap (e){
    /*
    console.log("----------------------------------------")
    console.log(this.props)
    console.log(e)
    console.log("----------------------------------------")
    console.log("this.props.showMute", this.props.showMute)
    console.log("e",e)
    console.log("----------------------------------------")
    */
    //if (!this.props.showMute&&!e) return
    if (this.props.showMute) return;
    window.powermove.handleJoinMicrophone()
    //this.props.handleLeaveAudio()
    //this.props.handleJoinAudio()
    //console.log(e)
  }
  
  render() {
    const {
      handleToggleMuteMicrophone,
      handleJoinAudio,
      handleLeaveAudio,
      showMute,
      muted,
      disable,
      talking,
      inAudio,
      listenOnly,
      intl,
      shortcuts,
      isVoiceUser,
    } = this.props;

    let joinIcon = 'audio_off';
    if (inAudio) {
      if (listenOnly) {
        joinIcon = 'listen';
      } else {
        joinIcon = 'listen';
      }
    }

    return (
      <span className={styles.container}>
        {showMute && isVoiceUser
          ? (
            <Button
             ref={this.talkBtn}
              className={cx(styles.button, !talking || styles.glow, !muted || styles.btn)}
              onClick={handleToggleMuteMicrophone}
              disabled={disable}
              hideLabel
              label={muted ? intl.formatMessage(intlMessages.unmuteAudio)
                : intl.formatMessage(intlMessages.muteAudio)}
              aria-label={muted ? intl.formatMessage(intlMessages.unmuteAudio)
                : intl.formatMessage(intlMessages.muteAudio)}
              color={!muted ? 'primary' : 'default'}
              ghost={muted}
              icon={muted ? 'mute' : 'unmute'}
              size="lg"
              circle
              accessKey={shortcuts.toggleMute}
            />
          ) : null}
        <Button
          ref={this.listenBtn}
          className={cx(styles.button, inAudio || styles.btn)}
          onClick={inAudio ? handleLeaveAudio : handleJoinAudio}
          disabled={disable}
          hideLabel
          aria-label={inAudio ? intl.formatMessage(intlMessages.leaveAudio)
            : intl.formatMessage(intlMessages.joinAudio)}
          label={inAudio ? intl.formatMessage(intlMessages.leaveAudio)
            : intl.formatMessage(intlMessages.joinAudio)}
          color={inAudio ? 'primary' : 'default'}
          ghost={!inAudio}
          icon={joinIcon}
          size="lg"
          circle
          accessKey={inAudio ? shortcuts.leaveAudio : shortcuts.joinAudio}
        />
      </span>);
  }
}

AudioControls.propTypes = propTypes;

export default withShortcutHelper(injectIntl(AudioControls), ['joinAudio', 'leaveAudio', 'toggleMute']);
