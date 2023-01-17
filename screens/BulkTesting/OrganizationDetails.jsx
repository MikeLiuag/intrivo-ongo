import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import { BlueButton } from '../../components/Buttons/BlueButton';
import CompletedScreen from '../../components/CompletedScreen';
import InvitePopUp from '../../components/InvitePopUp';
import { addUserToOrganization, clearOrganizationDetails } from '../../store/bulkTesting/slice';
import PickerDropdown from '../../components/Picker';

const OrganizationDetails = ({ route }) => {
  const { t } = useTranslation();
  const { code, dependentUUID } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isSchool, setSchool] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('');

  const { users, usersLookup } = useSelector((state) => state.user) || {};
  const { uuid, name, groups, selectedGroupName, showUserEnrolledModal } = useSelector(
    (state) => state.bulkTesting.organizationDetails
  );
  const mainUser = (users[0] && usersLookup[users[0]]) || {};

  const onSave = async () => {
    await dispatch(
      addUserToOrganization({
        dependentUUID,
        code,
        groupUUID: selectedGroup,
        orgUUID: uuid,
        mainUser,
      })
    );
  };
  const navigate = () => {
    dispatch(clearOrganizationDetails());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };
  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[t('bulkTesting.schoolDetail.title'), styles.title]}
        right={['x', () => navigation.goBack()]}
        addStyle={styles.header}
      />
      <View style={styles.content}>
        <PickerDropdown
          value={selectedGroup}
          placeholder={t('bulkTesting.schoolDetail.selectGroupPlaceholder')}
          style={styles.picker}
          items={groups || []}
          onChange={(value) => {
            setSelectedGroup(value);
          }}
        />
      </View>
      <BlueButton
        style={styles.primaryButton}
        styleText={styles.primaryButtonText}
        title={t('bulkTesting.schoolDetail.submitButton')}
        disabled={!selectedGroup}
        action={onSave}
      />
      {showUserEnrolledModal && (
        <CompletedScreen
          title={t('bulkTesting.schoolDetail.saved', {
            schoolName: name,
            groupName: selectedGroupName,
          })}
          descr={' '}
          visible={showUserEnrolledModal}
          animated
          result={2}
          setModal={navigate}
        />
      )}
      <InvitePopUp
        isSchool={isSchool}
        onCancel={() => navigation.goBack()}
        onContinue={() => setSchool(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.greyWhite,
  },
  header: {
    paddingTop: 24,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
    lineHeight: 30,
    marginLeft: -15,
  },
  content: {
    flex: 1,
  },
  picker: {
    marginTop: 40,
  },
  primaryButton: {
    marginBottom: 36,
  },
  primaryButtonText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
});

export default OrganizationDetails;
