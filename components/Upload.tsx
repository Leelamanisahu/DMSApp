import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const predefinedTags = ["Invoice", "Bill", "Report", "Contract"];

type DropdownItem = { label: string; value: string };

export default function UploadScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [majorHeadOpen, setMajorHeadOpen] = useState(false);
  const [majorHead, setMajorHead] = useState<string | null>(null);
  const [majorHeadItems, setMajorHeadItems] = useState([
    { label: "Personal", value: "personal" },
    { label: "Professional", value: "professional" },
  ]);

  const [minorHeadOpen, setMinorHeadOpen] = useState(false);
  const [minorHead, setMinorHead] = useState<string | null>(null);
  const [minorHeadItems, setMinorHeadItems] = useState<DropdownItem[]>([]);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState<any>(null);

  const personalNames = ["John", "Tom", "Emily"];
  const professionalDepartments = ["Accounts", "HR", "IT", "Finance"];

  useEffect(() => {
    if (majorHead === "personal") {
      setMinorHeadItems(
        personalNames.map((name) => ({ label: name, value: name }))
      );
    } else if (majorHead === "professional") {
      setMinorHeadItems(
        professionalDepartments.map((dep) => ({ label: dep, value: dep }))
      );
    } else {
      setMinorHeadItems([]);
    }
    setMinorHead(null); // reset minor head when major head changes
  }, [majorHead]);

  const pickImageOrPdf = async () => {
    const pdf = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf"],
      copyToCacheDirectory: true,
    });

    if (pdf.assets && pdf.assets[0]?.uri) {
      setFile(pdf.assets[0]);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleAddTag = () => {
    const clean = tagInput.trim();
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpload = () => {
    console.log({
      date,
      majorHead,
      minorHead,
      tags,
      remarks,
      file,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Select Document Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateBox}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
            setShowDatePicker(false);
          }}
        />
      )}

      <Text style={styles.label}>Category (Major Head)</Text>
      <DropDownPicker
        open={majorHeadOpen}
        value={majorHead}
        items={majorHeadItems}
        setOpen={setMajorHeadOpen}
        setValue={setMajorHead}
        setItems={setMajorHeadItems}
        placeholder="Select category"
        style={styles.dropdown}
        zIndex={3000}
        zIndexInverse={1000}
      />

      {majorHead && (
        <>
          <Text style={styles.label}>Sub-Category (Minor Head)</Text>
          <DropDownPicker
            open={minorHeadOpen}
            value={minorHead}
            items={minorHeadItems}
            setOpen={setMinorHeadOpen}
            setValue={setMinorHead}
            setItems={setMinorHeadItems}
            placeholder="Select sub-category"
            style={styles.dropdown}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </>
      )}

      <Text style={styles.label}>Add Tags</Text>
      <View style={styles.tagInputWrapper}>
        <TextInput
          placeholder="Type tag and press Add"
          value={tagInput}
          onChangeText={setTagInput}
          style={styles.input}
        />
        <Button color={"black"} title="Add" onPress={handleAddTag} />
      </View>

      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            onPress={() => handleRemoveTag(tag)}
            style={styles.tag}
          >
            <Text style={styles.tagText}>{tag} ✕</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Remarks</Text>
      <TextInput
        placeholder="Enter remarks"
        value={remarks}
        onChangeText={setRemarks}
        multiline
        style={[styles.input, { height: 80 }]}
      />

      <Text style={styles.label}>Upload File (Image/PDF)</Text>
      <Button
        color={"black"}
        title="Upload or Take Picture"
        onPress={pickImageOrPdf}
      />
      {file?.uri && (
        <>
          <Text style={{ marginTop: 10 }}>Selected File:</Text>
          {file?.mimeType === "application/pdf" ? (
            <Text>{file.name}</Text>
          ) : (
            <Image source={{ uri: file.uri }} style={styles.imagePreview} />
          )}
        </>
      )}

      <View style={{ marginTop: 30 }}>
        <Button color={"black"} title="Submit" onPress={handleUpload} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: "bold", marginTop: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    flex: 1,
  },
  dateBox: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  dropdown: { marginTop: 10, marginBottom: 20 },
  tagInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    gap: 8,
  },
  tag: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagText: {
    color: "#1e293b",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});
