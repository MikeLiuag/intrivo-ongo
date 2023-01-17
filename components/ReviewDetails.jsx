import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { BlueButton } from './Buttons/BlueButton';

const ReviewDetails = ({ title, data = [], onPressButton, buttonTitle }) => {
  const renderSingleSection = ({ label, value, isSeparated, isBold }) =>
    !label && !value ? null : (
      <View style={[styles.singleSection, isSeparated ? { ...styles.customSelection } : {}]}>
        <Text style={styles.label}>{label ? `${label} ` : ''}</Text>
        <Text style={[styles.value, isBold ? { ...styles.boldText } : {}]}>{value}</Text>
      </View>
    );

  const renderSections = () =>
    !!data.length &&
    data.map(({ title: sectionTitle, data: sectionData, note, hide, isSeparated }, index) => {
      const isLastSection = index === data.length - 1;
      const borderBottomWidth = isLastSection ? 0 : 1;
      const marginBottom = isLastSection ? 20 : 0;

      if (!hide)
        return (
          <View
            key={sectionTitle}
            style={[styles.sectionContainer, { marginBottom, borderBottomWidth }]}
          >
            {!!sectionTitle && <Text style={styles.sectionTitle}>{sectionTitle}</Text>}
            {sectionData.map((r) => renderSingleSection({ ...r, isSeparated }))}
            {!!note && <Text style={styles.noteText}>{note}</Text>}
          </View>
        );
      return null;
    });

  const renderButton = () => (
    <BlueButton action={onPressButton} style={styles.bottomButton} title={buttonTitle} />
  );

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {!!title && <Text style={styles.title}>{title}</Text>}
      {renderSections()}
      {renderButton()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
    lineHeight: 36,
    fontSize: 24,
  },
  singleSection: { flexDirection: 'row' },
  customSelection: { flexDirection: 'column', paddingBottom: 5 },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
    paddingTop: 24,
    paddingBottom: 19,
  },
  sectionTitle: {
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
    fontSize: fonts.sizeLarge,
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.familyBold,
    lineHeight: 22,
    color: colors.greyDark,
  },
  value: {
    lineHeight: 22,
    color: colors.greyDark,
    fontFamily: fonts.familyLight,
    flex: 1,
  },
  boldText: {
    color: colors.greyMed,
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyBold,
    marginBottom: 5,
  },
  noteText: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeSmall,
    lineHeight: 22,
    color: colors.greyDark,
    marginTop: 16,
  },
  bulletListContainer: {
    paddingLeft: 5,
    marginBottom: 10,
  },
  bottomButton: {
    marginTop: 'auto',
  },
});

export default ReviewDetails;
