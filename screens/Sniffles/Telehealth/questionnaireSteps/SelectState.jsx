import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text } from 'react-native';
import { Tooltip } from 'react-native-elements';
import Icon from '../../../../components/Icon';
import PickerDropdown from '../../../../components/Picker';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';
import { colors } from '../../../../theme';
import { states } from '../../../../utilis/mock';

const translationPath = 'screens.telehealth.questions.visitLocation';

const SelectState = ({ userInfo, onChangeState }) => {
  const { t } = useTranslation();

  const onChangeData = (value) =>
    onChangeState({ ...userInfo, state_id: value }, snifflesFieldNames.USER_INFO);

  return (
    <View style={styles.container}>
      <PickerDropdown
        items={states}
        onChange={onChangeData}
        value={userInfo.state_id}
        placeholder={t('placeholder.state')}
        containerStyle={styles.picker}
      />
      <Tooltip
        withOverlay={false}
        backgroundColor={colors.greyDark2}
        popover={<Text style={styles.tooltipText}>{t(`${translationPath}.toolTipText`)}</Text>}
        height={null}
        width={157}
      >
        <Icon type='MaterialIcons' name='info' size={26} color={colors.primaryBlue} />
      </Tooltip>
    </View>
  );
};

export default SelectState;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
  },
  inputContainer: {
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: '95%',
    marginRight: 10,
  },
  tooltipText: {
    textAlign: 'center',
    color: colors.white,
  },
});
