import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import {
  Icon,
  Text,
  List,
  ListItem,
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements'

import theme from '../config/theme.config'
import PartialModal from './partialmodal.component'

interface IFileItemProps {
  id: number
  key?: string
  name?: string
  createdDate?: string
  onPress?: (id: number) => void
  renameCallback?: (id: number, name: string) => void
  deleteCallback?: (id: number) => void
  shareCallback?: (id: number) => void
}

interface IFileItemState {
  mainModalVisible: boolean
  renameModalVisible: boolean
  deleteModalVisible: boolean
  shareModalVisible: boolean
  sessionName: string
}

@observer
export default class FileItem extends React.Component<
  IFileItemProps,
  IFileItemState
> {
  state: IFileItemState = {
    mainModalVisible: false,
    renameModalVisible: false,
    deleteModalVisible: false,
    shareModalVisible: false,
    sessionName: this.props.name || ''
  }

  constructor(props: IFileItemProps) {
    super(props)

    this.toggleMainModal = this.toggleMainModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.toggleShareModal = this.toggleShareModal.bind(this)
    this.toggleRenameModal = this.toggleRenameModal.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  private toggleMainModal() {
    this.setState({ mainModalVisible: !this.state.mainModalVisible })
  }

  private toggleRenameModal() {
    this.setState({ renameModalVisible: !this.state.renameModalVisible })
  }

  private toggleDeleteModal() {
    this.setState({ deleteModalVisible: !this.state.deleteModalVisible })
  }

  private toggleShareModal() {
    this.setState({ shareModalVisible: !this.state.shareModalVisible })
  }

  private updateName(text: string) {
    this.setState({ sessionName: text })
  }

  render() {
    return (
      <View key={this.props.id} style={styles.container}>
        <Text style={styles.titleText}>{this.props.name}</Text>
        <Icon
          underlayColor={theme.colors.secondary}
          name="file-text"
          type="font-awesome"
          size={90}
          color={theme.colors.accent}
          containerStyle={styles.iconContainer}
          onPress={() => {
            if (this.props.onPress) {
              this.props.onPress(this.props.id)
            }
          }}
          onLongPress={this.toggleMainModal}
        />
        <Text style={StyleSheet.flatten([styles.footerText, { marginTop: 8 }])}>
          {this.props.createdDate ? this.props.createdDate.split(' ')[0] : ''}
        </Text>
        <Text style={StyleSheet.flatten([styles.footerText, { marginTop: 3 }])}>
          {this.props.createdDate ? this.props.createdDate.split(' ')[1] : ''}
        </Text>
        <PartialModal
          modalVisible={this.state.mainModalVisible}
          toggleModal={this.toggleMainModal}
        >
          <List containerStyle={styles.listContainer}>
            <ListItem
              leftIcon={{
                name: 'edit',
                type: 'material',
                color: theme.colors.darkAccent
              }}
              title="Rename"
              titleStyle={{ color: theme.colors.darkAccent }}
              hideChevron
              onPress={() => {
                this.toggleMainModal()
                this.toggleRenameModal()
              }}
            />
            <ListItem
              leftIcon={{
                name: 'share',
                type: 'material',
                color: theme.colors.darkAccent
              }}
              title="Share"
              titleStyle={{ color: theme.colors.darkAccent }}
              hideChevron
              onPress={() => {
                if (this.props.shareCallback) {
                  this.props.shareCallback(this.props.id)
                  this.toggleMainModal()
                }
              }}
            />
            <ListItem
              leftIcon={{
                name: 'delete',
                type: 'material',
                color: theme.colors.darkAccent
              }}
              title="Delete"
              titleStyle={{ color: theme.colors.darkAccent }}
              hideChevron
              onPress={() => {
                this.toggleMainModal()
                this.toggleDeleteModal()
              }}
            />
          </List>
        </PartialModal>
        <PartialModal
          floating
          modalVisible={this.state.deleteModalVisible}
          toggleModal={this.toggleDeleteModal}
        >
          <View>
            <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
              Do you want to delete this file?
            </FormLabel>
            <View
              style={styles.deleteButtonContainer}
            >
              <Button
                color={theme.colors.darkAccent}
                backgroundColor={theme.colors.accent}
                title="Cancel"
                onPress={this.toggleDeleteModal}
              />
              <Button
                color={theme.colors.darkAccent}
                backgroundColor={theme.colors.accent}
                title="Delete"
                onPress={() => {
                  if (this.props.deleteCallback) {
                    this.props.deleteCallback(this.props.id)
                    this.toggleDeleteModal()
                  }
                }}
              />
            </View>
          </View>
        </PartialModal>
        <PartialModal
          floating
          modalVisible={this.state.renameModalVisible}
          toggleModal={this.toggleRenameModal}
        >
          <View>
            <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
              Rename File
            </FormLabel>
            <FormInput
              autoFocus
              placeholder="Enter new name"
              value={this.state.sessionName}
              onChangeText={this.updateName}
              containerStyle={{flexDirection: 'row'}}
              inputStyle={{flex: 1}}
            />
            <View style={styles.renameButtonContainer}>
              <Button
                color={theme.colors.darkAccent}
                backgroundColor={theme.colors.accent}
                title="Cancel"
                onPress={this.toggleRenameModal}
              />
              <Button
                color={theme.colors.darkAccent}
                backgroundColor={theme.colors.accent}
                title="Rename"
                onPress={() => {
                  if (this.props.renameCallback) {
                    this.props.renameCallback(
                      this.props.id,
                      this.state.sessionName
                    )
                    this.toggleRenameModal()
                  }
                }}
              />
            </View>
          </View>
        </PartialModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 25,
    alignItems: 'center',
    margin: 20
  },
  iconContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  titleText: {
    color: theme.colors.darkAccent,
    marginBottom: 10
  },
  footerText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.fileIconFooter
  },
  listContainer: {
    marginTop: 3,
    borderTopWidth: 0,
    paddingLeft: 5
  },
  renameButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30
  },
})
